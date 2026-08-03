'use client';

import React from 'react';
import { UserRound } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import StatusBadge from '../ui/StatusBadge';
import { deleteFaculty } from '@/actions/faculty.action';

const FacultyList = ({ facultyList, loading, refresh }) => {
    const columns = [
        {
            key: 'photo',
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
            key: 'employeeType',
            header: 'Type',
            cell: (item) => (
                <StatusBadge variant="secondary">
                    {item.employeeType}
                </StatusBadge>
            ),
        },
        {
            key: 'email',
            header: 'Email',
            cell: (item) => (
                <span className="text-muted-foreground">{item.email}</span>
            ),
        },
        {
            key: 'phone',
            header: 'Phone',
            cell: (item) => item.phone,
        },
        {
            key: 'dateOfJoining',
            header: 'Joining',
            cell: (item) =>
                item.dateOfJoining
                    ? new Date(item.dateOfJoining).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })
                    : '—',
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    editHref={`/admin/faculty/update/${item._id}`}
                    onDelete={async () => {
                        await deleteFaculty(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete employee?"
                    deleteDescription="This will permanently remove this employee from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={facultyList}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'email', 'designation', 'employeeType']}
            searchPlaceholder="Search employees…"
            emptyState={{
                title: 'No employees yet',
                subtitle:
                    'Create your first employee or use bulk import to get started.',
            }}
        />
    );
};

export default FacultyList;
