'use client';

import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import GalleryForm from './GalleryForm';
import { deleteGallery } from '@/actions/gallery.action';

const GalleryList = ({ galleryList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'image',
            header: 'Image',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name || 'Gallery item'}
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
            key: 'imgDescription',
            header: 'Description',
            cell: (item) => (
                <span className="text-muted-foreground">
                    {item.imgDescription}
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
                        await deleteGallery(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete gallery item?"
                    deleteDescription="This will permanently remove this gallery item from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={galleryList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'imgDescription']}
                searchPlaceholder="Search gallery items…"
                emptyState={{
                    title: 'No gallery items yet',
                    subtitle: 'Your gallery list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Gallery Item"
                description="Update gallery item title, description, and image."
            >
                {editingItem && (
                    <GalleryForm
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

export default GalleryList;
