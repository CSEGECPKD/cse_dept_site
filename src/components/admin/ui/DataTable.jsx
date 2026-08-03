'use client';

import { useMemo, useState } from 'react';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Inbox,
} from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Toolbar from './Toolbar';
import SearchBar from './SearchBar';
import EmptyState from './EmptyState';
import { TableSkeleton } from './LoadingSkeleton';
import { cn } from '@/lib/utils';

function getValue(row, path) {
    if (typeof path === 'function') return path(row);
    return path.split('.').reduce((acc, key) => acc?.[key], row);
}

export default function DataTable({
    data = [],
    loading = false,
    columns = [],
    searchKeys = [],
    searchPlaceholder = 'Search…',
    getRowKey = (row) => row._id,
    emptyState = {
        icon: Inbox,
        title: 'No items yet',
        subtitle: 'Your list is empty.',
        action: null,
    },
    toolbar,
    pageSize = 10,
    className,
}) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        if (!search.trim() || searchKeys.length === 0) return data;
        const q = search.trim().toLowerCase();
        return data.filter((row) =>
            searchKeys.some((key) =>
                String(getValue(row, key) ?? '')
                    .toLowerCase()
                    .includes(q)
            )
        );
    }, [data, search, searchKeys]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        const col = columns.find((c) => c.key === sortKey);
        const extract = col?.sortValue || col?.cell || ((row) => row[sortKey]);
        return [...filtered].sort((a, b) => {
            const va = String(extract(a) ?? '').toLowerCase();
            const vb = String(extract(b) ?? '').toLowerCase();
            const cmp = va < vb ? -1 : va > vb ? 1 : 0;
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [filtered, sortKey, sortDir, columns]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const pageRows = useMemo(
        () => sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
        [sorted, safePage, pageSize]
    );

    const toggleSort = (col) => {
        if (col.key === sortKey) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(col.key);
            setSortDir('asc');
        }
        setPage(1);
    };

    const SortIcon = ({ col }) => {
        if (!col.sortable) return null;
        if (col.key !== sortKey)
            return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />;
        return sortDir === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
        ) : (
            <ArrowDown className="ml-1 h-3 w-3" />
        );
    };

    return (
        <div className={cn('space-y-4', className)}>
            <Toolbar>
                <div className="flex flex-1 items-center gap-2">
                    {searchKeys.length > 0 && (
                        <SearchBar
                            value={search}
                            onChange={(v) => {
                                setSearch(v);
                                setPage(1);
                            }}
                            placeholder={searchPlaceholder}
                        />
                    )}
                </div>
                {toolbar}
                <div className="text-xs text-muted-foreground">
                    {sorted.length} item{sorted.length === 1 ? '' : 's'}
                </div>
            </Toolbar>

            <div className="overflow-hidden rounded-lg border">
                {loading ? (
                    <div className="p-5">
                        <TableSkeleton rows={6} columns={columns.length} />
                    </div>
                ) : sorted.length === 0 ? (
                    <EmptyState
                        icon={emptyState.icon || Inbox}
                        title={emptyState.title}
                        subtitle={emptyState.subtitle}
                        action={emptyState.action}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <Table className="min-w-full">
                            <TableHeader className="bg-muted/50">
                                <TableRow className="hover:bg-transparent">
                                    {columns.map((col) => (
                                        <TableHead
                                            key={col.key}
                                            className={cn(
                                                'whitespace-nowrap font-semibold',
                                                col.headerClassName
                                            )}
                                        >
                                            {col.sortable ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleSort(col)
                                                    }
                                                    className={cn(
                                                        'inline-flex items-center gap-1 transition-colors hover:text-foreground',
                                                        sortKey === col.key &&
                                                            'text-foreground'
                                                    )}
                                                >
                                                    {col.header}
                                                    <SortIcon col={col} />
                                                </button>
                                            ) : (
                                                col.header
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pageRows.map((row) => (
                                    <TableRow
                                        key={getRowKey(row)}
                                        className="hover:bg-muted/40"
                                    >
                                        {columns.map((col) => (
                                            <TableCell
                                                key={col.key}
                                                className={cn(
                                                    'whitespace-nowrap align-middle',
                                                    col.cellClassName
                                                )}
                                            >
                                                {col.cell
                                                    ? col.cell(row)
                                                    : getValue(row, col.key)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            {!loading && sorted.length > 0 && (
                <div className="flex items-center justify-between gap-2 text-sm">
                    <p className="text-muted-foreground">
                        Showing {pageRows.length} of {sorted.length} items
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            disabled={safePage <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-2 text-sm text-muted-foreground">
                            {safePage} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            disabled={safePage >= totalPages}
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
