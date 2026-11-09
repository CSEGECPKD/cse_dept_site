'use client';

import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import StudentGroupForm from './StudentGroupForm';
import { deleteStudentGroup } from '@/actions/studentgroup.action';

const StudentGroupList = ({ studentGroupList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'logoUrl',
            header: 'Logo',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.logoUrl ? (
                        <img
                            src={item.logoUrl}
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
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
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
                    onEdit={() => setEditingItem(item)}
                    onDelete={async () => {
                        await deleteStudentGroup(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete student group?"
                    deleteDescription="This will permanently remove this student group from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={studentGroupList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'description']}
                searchPlaceholder="Search student groups…"
                emptyState={{
                    title: 'No student groups yet',
                    subtitle: 'Your student group list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Student Group"
                description="Update student group details and logo."
            >
                {editingItem && (
                    <StudentGroupForm
                        initialData={editingItem}
                        onSuccess={() => {
                            setEditingItem(null);
                            refresh();
                        }}
                        onCancel={() => setEditingItem(null)}
                    />
                )}
            </EditDialog>
        </>
    );
};

export default StudentGroupList;
