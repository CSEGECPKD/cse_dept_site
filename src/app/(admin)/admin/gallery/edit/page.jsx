import { getGalleries } from '@/actions/gallery.action';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import GalleryList from '@/components/admin/gallery/GalleryList';
import React from 'react';

const EditAccreditionPage = async () => {
    const galleries = await getGalleries();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <GalleryForm />
            </div>
            <div className="py-20 px-10">
                <GalleryList galleryList={galleries} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
