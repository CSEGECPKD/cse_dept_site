'use client';

import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import CertificateForm from './CertificateForm';
import { deleteCertificate } from '@/actions/certificate.action';

const CertificateList = ({ certificateList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'imageUrl',
            header: 'Image',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.imageUrl ? (
                        <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-5 w-5" />
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
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onEdit={() => setEditingItem(item)}
                    onDelete={async () => {
                        await deleteCertificate(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete certificate?"
                    deleteDescription="This will permanently remove this certificate from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={certificateList}
                loading={loading}
                columns={columns}
                searchKeys={['name']}
                searchPlaceholder="Search certificates…"
                emptyState={{
                    title: 'No certificates yet',
                    subtitle: 'Your certificate list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Certificate"
                description="Update certificate name and image."
            >
                {editingItem && (
                    <CertificateForm
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

export default CertificateList;
