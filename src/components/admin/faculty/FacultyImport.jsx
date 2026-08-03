'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
    Download,
    FileSpreadsheet,
    Loader2,
    UploadCloud,
    CheckCircle2,
    XCircle,
    AlertTriangle,
} from 'lucide-react';

import { importFaculties } from '@/actions/faculty.action';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import StatusBadge from '../ui/StatusBadge';

const HEADERS = [
    { key: 'name', label: 'Full Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'employeeType', label: 'Employee Type' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'imageUrl', label: 'Image URL' },
];

const HEADER_MAP = {
    'full name': 'name',
    designation: 'designation',
    'employee type': 'employeeType',
    'date of joining': 'dateOfJoining',
    email: 'email',
    phone: 'phone',
    'image url': 'imageUrl',
    photo: 'imageUrl',
    image: 'imageUrl',
};

const FacultyImport = ({ refreshFaculties }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [rows, setRows] = useState([]);
    const [importRows, setImportRows] = useState([]);
    const [parsing, setParsing] = useState(false);
    const [importing, setImporting] = useState(false);
    const [parseError, setParseError] = useState('');
    const [summary, setSummary] = useState(null);

    const downloadTemplate = useCallback(async () => {
        try {
            const ExcelJS = await import('exceljs');
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Employees');
            worksheet.columns = HEADERS.map((header) => ({
                header: header.label,
                key: header.key,
                width: 28,
            }));
            worksheet.getRow(1).font = { bold: true };
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'employee-template.xlsx';
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download template:', error);
        }
    }, []);

    const handleFile = useCallback(async (file) => {
        if (!file) return;
        setFileName(file.name);
        setParseError('');
        setSummary(null);
        setRows([]);
        setImportRows([]);
        setParsing(true);
        try {
            const extension = file.name.split('.').pop().toLowerCase();
            const cellRows =
                extension === 'csv'
                    ? parseCsv(await file.text())
                    : await parseXlsx(await file.arrayBuffer());
            const { previewRows, importRows } = buildRows(cellRows);
            setRows(previewRows);
            setImportRows(importRows);
        } catch (error) {
            console.error('Failed to parse file:', error);
            setParseError(
                'Could not parse the file. Please make sure it is a valid .xlsx or .csv file.'
            );
        } finally {
            setParsing(false);
        }
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const file = event.dataTransfer?.files?.[0];
            handleFile(file);
        },
        [handleFile]
    );

    const onImport = useCallback(async () => {
        if (
            !Array.isArray(importRows) ||
            importRows.length === 0 ||
            importing
        ) {
            return;
        }
        setImporting(true);
        const rowCount = importRows.length;
        try {
            const result = await importFaculties(importRows);
            setSummary(result);
            refreshFaculties?.();
        } catch (error) {
            console.error('Import failed:', error);
            setSummary({
                total: rowCount,
                imported: 0,
                skipped: rowCount,
                errors: [
                    {
                        row: 0,
                        type: 'error',
                        message: `Import failed: ${error.message}`,
                    },
                ],
            });
        } finally {
            setImporting(false);
        }
    }, [importRows, importing, refreshFaculties]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium">
                        Import employees in bulk
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Use the provided template to prepare your file.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={downloadTemplate}
                    className="gap-2"
                >
                    <Download className="h-4 w-4" />
                    Download Template
                </Button>
            </div>

            <div
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 px-6 py-10 text-center transition-colors hover:border-primary hover:bg-muted/50"
                onDragOver={(event) => event.preventDefault()}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.csv"
                    className="hidden"
                    onChange={(event) => handleFile(event.target.files?.[0])}
                />
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UploadCloud className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">
                    Drag and drop your file here, or click to browse
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Supported formats: .xlsx, .csv
                </p>
                {fileName && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                        <FileSpreadsheet className="h-3.5 w-3.5" />
                        {fileName}
                    </p>
                )}
            </div>

            {parsing && (
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Parsing file, please wait...
                </p>
            )}

            {parseError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {parseError}
                </div>
            )}

            {rows.length > 0 && !parsing && (
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border">
                        <div className="overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader className="bg-muted/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="whitespace-nowrap font-semibold">
                                            Row
                                        </TableHead>
                                        {HEADERS.map((header) => (
                                            <TableHead
                                                key={header.key}
                                                className="whitespace-nowrap font-semibold"
                                            >
                                                {header.label}
                                            </TableHead>
                                        ))}
                                        <TableHead className="whitespace-nowrap font-semibold">
                                            Errors
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.rowNumber}>
                                            <TableCell>
                                                {row.rowNumber}
                                            </TableCell>
                                            {HEADERS.map((header) => (
                                                <TableCell
                                                    key={header.key}
                                                    className="max-w-[200px] truncate"
                                                >
                                                    {row[header.key]}
                                                </TableCell>
                                            ))}
                                            <TableCell>
                                                {row.errors.length > 0 ? (
                                                    <span className="text-xs font-medium text-destructive">
                                                        {row.errors.join('; ')}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Ready
                                                    </span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={onImport}
                            disabled={importing}
                            className="gap-2"
                        >
                            {importing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <UploadCloud className="h-4 w-4" />
                            )}
                            {importing ? 'Importing…' : 'Import'}
                        </Button>
                        {importing && (
                            <span className="text-sm text-muted-foreground">
                                Importing employees, please wait...
                            </span>
                        )}
                    </div>
                </div>
            )}

            {summary && (
                <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
                    <h3 className="text-sm font-semibold">Import Summary</h3>
                    <div className="flex flex-wrap gap-3">
                        <StatusBadge variant="secondary">
                            Total: {summary.total}
                        </StatusBadge>
                        <StatusBadge variant="default">
                            Imported: {summary.imported}
                        </StatusBadge>
                        <StatusBadge variant="outline">
                            Skipped: {summary.skipped}
                        </StatusBadge>
                    </div>
                    {summary.errors.length > 0 && (
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                                <AlertTriangle className="h-4 w-4" />
                                Issues found
                            </p>
                            <ul className="max-h-40 space-y-1 overflow-y-auto rounded-md border bg-background p-3 text-xs text-muted-foreground">
                                {summary.errors.map((error, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-1.5"
                                    >
                                        {error.type === 'warning' ? (
                                            <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                                        ) : (
                                            <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                                        )}
                                        <span>
                                            {error.row > 0 &&
                                                `Row ${error.row}: `}
                                            {error.message}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

async function parseXlsx(arrayBuffer) {
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
        throw new Error('Workbook has no worksheets');
    }
    const cellRows = [];
    worksheet.eachRow((row) => {
        const cells = [];
        for (let column = 1; column <= HEADERS.length + 1; column++) {
            const cell = row.getCell(column);
            cells.push(cellValueToString(cell));
        }
        cellRows.push(cells);
    });
    return cellRows;
}

function cellValueToString(cell) {
    if (!cell || cell.value === null || cell.value === undefined) return '';
    const value = cell.value;
    if (value instanceof Date && !isNaN(value)) {
        return value.toISOString().slice(0, 10);
    }
    return String(cell.text ?? value).trim();
}

function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        if (inQuotes) {
            if (char === '"') {
                if (text[index + 1] === '"') {
                    field += '"';
                    index++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += char;
            }
        } else if (char === '"') {
            inQuotes = true;
        } else if (char === ',') {
            row.push(field);
            field = '';
        } else if (char === '\n' || char === '\r') {
            if (char === '\r' && text[index + 1] === '\n') index++;
            row.push(field);
            field = '';
            if (row.some((value) => value.trim() !== '')) {
                rows.push(row);
            }
            row = [];
        } else {
            field += char;
        }
    }
    if (field !== '' || row.length > 0) {
        row.push(field);
        if (row.some((value) => value.trim() !== '')) {
            rows.push(row);
        }
    }
    return rows;
}

function buildRows(cellRows) {
    const headerIndex = cellRows.findIndex((row) =>
        row.some((value) => value.trim() !== '')
    );
    if (headerIndex === -1) {
        throw new Error('File is empty');
    }

    const header = cellRows[headerIndex].map((value) => normalizeHeader(value));
    const columnMap = {};
    HEADERS.forEach((headerDef) => {
        const index = header.indexOf(headerDef.key);
        columnMap[headerDef.key] = index === -1 ? null : index;
    });

    const data = [];
    for (let index = headerIndex + 1; index < cellRows.length; index++) {
        const cells = cellRows[index];
        if (!cells.some((value) => String(value).trim() !== '')) continue;
        const row = { rowNumber: index + 1 };
        HEADERS.forEach((headerDef) => {
            const columnIndex = columnMap[headerDef.key];
            const raw =
                columnIndex === null
                    ? ''
                    : String(cells[columnIndex] ?? '').trim();
            row[headerDef.key] =
                headerDef.key === 'dateOfJoining' ? toDateString(raw) : raw;
        });
        data.push(row);
    }

    const previewRows = data.map((row) => ({
        ...row,
        errors: validateRow(row),
    }));
    const importRows = data.map(({ rowNumber, ...rest }) => rest);
    return { previewRows, importRows };
}

function normalizeHeader(value) {
    const normalized = String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
    return HEADER_MAP[normalized] ?? normalized;
}

function toDateString(value) {
    const str = String(value ?? '').trim();
    const match = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
    if (match) {
        return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(
            2,
            '0'
        )}`;
    }
    return str;
}

function validateRow(row) {
    const errors = [];
    if (!row.name) errors.push('Missing Full Name');
    if (!row.designation) errors.push('Missing Designation');
    if (!row.employeeType) errors.push('Missing Employee Type');
    if (!row.dateOfJoining) {
        errors.push('Invalid or missing Date of Joining');
    } else if (isNaN(new Date(row.dateOfJoining))) {
        errors.push('Invalid Date of Joining');
    }
    if (!row.email) {
        errors.push('Missing Email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.push('Invalid Email');
    }
    if (!row.phone) errors.push('Missing Phone Number');
    return errors;
}

export default FacultyImport;
