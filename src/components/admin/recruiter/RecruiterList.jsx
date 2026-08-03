'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteRecruiter } from '@/actions/recruiter.action';

const RecruiterList = ({ recruiterList, loading, refresh }) => {
    const columns = [
        {
            key: 'companyLogo',
            header: 'Logo',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.companyLogo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={item.companyLogo}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <Building2 className="h-5 w-5" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'companyName',
            header: 'Company Name',
            sortable: true,
            cell: (item) => (
                <span className="font-medium">{item.companyName}</span>
            ),
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteRecruiter(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete recruiter?"
                    deleteDescription="This will permanently remove this recruiter from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={recruiterList}
            loading={loading}
            columns={columns}
            searchKeys={['companyName']}
            searchPlaceholder="Search recruiters…"
            emptyState={{
                title: 'No recruiters yet',
                subtitle: 'Your recruiter list is empty.',
            }}
        />
    );
};

export default RecruiterList;
