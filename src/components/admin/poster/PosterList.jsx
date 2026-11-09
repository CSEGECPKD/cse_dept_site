'use client';

import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import PosterForm from './PosterForm';
import { deletePoster } from '@/actions/poster.action';

const PosterList = ({ posterList, loading, refresh }) => {
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
                            alt={item.name || 'Poster item'}
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
                        await deletePoster(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete poster?"
                    deleteDescription="This will permanently remove this poster from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={posterList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'description']}
                searchPlaceholder="Search posters…"
                emptyState={{
                    title: 'No posters yet',
                    subtitle: 'Your poster list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Poster"
                description="Update poster name, description, and image."
            >
                {editingItem && (
                    <PosterForm
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

export default PosterList;
