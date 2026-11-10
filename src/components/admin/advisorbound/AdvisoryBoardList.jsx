'use client';

import React, { useState } from 'react';
import { UserRound } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import AdvisorBoundForm from './AdvisorBoundForm';
import { deleteAdvisoryBoardMember } from '@/actions/advisoryboard.action';

const AdvisoryBoardList = ({ advisoryBoardList, loading, refresh }) => {
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
                    onEdit={() => setEditingItem(item)}
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
        <>
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
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Advisor"
                description="Update advisory board member information and photo."
            >
                {editingItem && (
                    <AdvisorBoundForm
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

export default AdvisoryBoardList;
