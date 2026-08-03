'use client';

import React from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteMagazine } from '@/actions/magazine.action';

const MagazineList = ({ magazines, loading, refresh }) => {
    const columns = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'category',
            header: 'Category',
            cell: (item) => item.category,
        },
        {
            key: 'date',
            header: 'Date',
            sortable: true,
            cell: (item) =>
                item.date
                    ? new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })
                    : '—',
        },
        {
            key: 'description',
            header: 'Description',
            cell: (item) => (
                <span className="text-muted-foreground">
                    {item.description}
                </span>
            ),
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteMagazine(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete magazine?"
                    deleteDescription="This will permanently remove this magazine from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={magazines}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'category']}
            searchPlaceholder="Search magazines…"
            emptyState={{
                title: 'No magazines yet',
                subtitle: 'Your magazine list is empty.',
            }}
        />
    );
};

export default MagazineList;
