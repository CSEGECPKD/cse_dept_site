'use client';

import React, { useCallback, useRef, useState } from 'react';

import { importFaculties } from '@/actions/faculty.action';
import SubmitButton from '@/components/admin/SubmitButton';

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
        <div className="space-y-4">
            <h2 className="text-3xl font-medium">BULK EMPLOYEE IMPORT</h2>

            <div className="flex gap-2.5">
                <SubmitButton
                    label="Download Template"
                    onClick={downloadTemplate}
                />
            </div>

            <div
                className="p-8 border-2 border-dashed border-[#696969] text-center cursor-pointer bg-[#E9E9E8]"
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
                <p className="text-lg font-medium">
                    Drag and drop your Excel file here, or click to select
                </p>
                <p className="text-sm text-[#696969]">
                    Supported formats: .xlsx, .csv
                </p>
                {fileName && (
                    <p className="mt-2 text-sm">Selected: {fileName}</p>
                )}
            </div>

            {parsing && (
                <p className="text-center text-[#696969]">
                    Parsing file, please wait...
                </p>
            )}

            {parseError && <p className="text-red-500">{parseError}</p>}

            {rows.length > 0 && !parsing && (
                <div className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left bg-[#E9E9E8]">
                            <thead>
                                <tr>
                                    <th className="p-2">Row</th>
                                    {HEADERS.map((header) => (
                                        <th key={header.key} className="p-2">
                                            {header.label}
                                        </th>
                                    ))}
                                    <th className="p-2">Errors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr
                                        key={row.rowNumber}
                                        className="border-t border-white"
                                    >
                                        <td className="p-2">{row.rowNumber}</td>
                                        {HEADERS.map((header) => (
                                            <td
                                                key={header.key}
                                                className="p-2"
                                            >
                                                {row[header.key]}
                                            </td>
                                        ))}
                                        <td className="p-2 text-red-500">
                                            {row.errors.join('; ')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <SubmitButton
                            label={importing ? 'Importing...' : 'Import'}
                            onClick={onImport}
                            disabled={importing}
                        />
                        {importing && (
                            <span className="text-[#696969]">
                                Importing employees, please wait...
                            </span>
                        )}
                    </div>
                </div>
            )}

            {summary && (
                <div className="p-4 bg-[#E9E9E8] space-y-2">
                    <h3 className="text-xl font-medium">IMPORT SUMMARY</h3>
                    <p>Total rows in file: {summary.total}</p>
                    <p>Employees imported: {summary.imported}</p>
                    <p>Rows skipped: {summary.skipped}</p>
                    {summary.errors.length > 0 && (
                        <div className="space-y-1">
                            <p className="font-medium">Errors found:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                {summary.errors.map((error, index) => (
                                    <li key={index}>
                                        {error.row > 0 && `Row ${error.row}: `}
                                        {error.message}
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
