'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteGallery } from '@/actions/gallery.action';

const GalleryList = ({ galleryList }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">GALLERY LIST</h2>
            <ul className="space-y-1">
                {galleryList.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.name}
                        handleDelete={async () => {
                            await deleteGallery(item._id);
                        }}
                    />
                ))}
                {galleryList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default GalleryList;
