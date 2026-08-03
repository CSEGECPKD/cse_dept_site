'use client';

import React from 'react';
import { Image } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteGallery } from '@/actions/gallery.action';

const GalleryList = ({ galleryList, loading, refresh }) => {
    const columns = [
        {
            key: 'image',
            header: 'Image',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <Image className="h-5 w-5" />
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
    );
};

export default GalleryList;
