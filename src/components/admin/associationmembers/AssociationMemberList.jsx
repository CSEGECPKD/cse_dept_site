'use client';

import React, { useState } from 'react';
import { UserRound } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import AssociationMemberForm from './AssociationMemberForm';
import StatusBadge from '../ui/StatusBadge';
import { deleteAssociationMember } from '@/actions/associationmembers.action';

const AssociationMemberList = ({ associationMemberList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'imageUrl',
            header: 'Photo',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-full border bg-muted">
                    {item.imageUrl ? (
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
            cell: (item) => (
                <StatusBadge variant="secondary">
                    {item.designation}
                </StatusBadge>
            ),
        },
        {
            key: 'year',
            header: 'Year',
            cell: (item) => item.year,
        },
        {
            key: 'mailId',
            header: 'Email',
            cell: (item) => (
                <span className="text-muted-foreground">{item.mailId}</span>
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
                        await deleteAssociationMember(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete member?"
                    deleteDescription="This will permanently remove this member from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={associationMemberList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'designation', 'mailId']}
                searchPlaceholder="Search members…"
                emptyState={{
                    title: 'No members yet',
                    subtitle: 'Your member list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Association Member"
                description="Update member details, designation, and photo."
            >
                {editingItem && (
                    <AssociationMemberForm
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

export default AssociationMemberList;
