'use client';

import React from 'react';
import { UserRound } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteAdvisoryBoardMember } from '@/actions/advisoryboard.action';

const AdvisoryBoardList = ({ advisoryBoardList, loading, refresh }) => {
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
            key: 'designation',
            header: 'Designation',
            cell: (item) => item.designation,
        },
        {
            key: 'position',
            header: 'Position',
            cell: (item) => item.position,
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteAdvisoryBoardMember(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete advisor?"
                    deleteDescription="This will permanently remove this advisor from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={advisoryBoardList}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'designation']}
            searchPlaceholder="Search advisors…"
            emptyState={{
                title: 'No advisors yet',
                subtitle: 'Your advisory board list is empty.',
            }}
        />
    );
};

export default AdvisoryBoardList;
