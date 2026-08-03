'use client';

import React from 'react';
import { UserRound } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteTopper } from '@/actions/topper.action';

const TopperList = ({ topperList, loading, refresh }) => {
    const columns = [
        {
            key: 'imageUrl',
            header: 'Photo',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-full border bg-muted">
                    {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <UserRound className="h-5 w-5" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'course',
            header: 'Course',
            cell: (item) => item.course,
        },
        {
            key: 'batch',
            header: 'Batch',
            cell: (item) => item.batch,
        },
        {
            key: 'year',
            header: 'Year',
            cell: (item) => item.year,
        },
        {
            key: 'sem',
            header: 'Semester',
            cell: (item) => item.sem,
        },
        {
            key: 'cgpa',
            header: 'CGPA',
            cell: (item) => item.cgpa,
        },
        {
            key: 'sgpa',
            header: 'SGPA',
            cell: (item) => item.sgpa,
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteTopper(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete topper?"
                    deleteDescription="This will permanently remove this topper from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={topperList}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'course', 'batch']}
            searchPlaceholder="Search toppers…"
            emptyState={{
                title: 'No toppers yet',
                subtitle: 'Your topper list is empty.',
            }}
        />
    );
};

export default TopperList;
