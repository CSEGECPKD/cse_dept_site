'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getGalleries } from '@/actions/gallery.action';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import GalleryList from '@/components/admin/gallery/GalleryList';

const EditAccreditionPage = () => {
    const [galleryList, setGalleryList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGalleries = useCallback(async () => {
        try {
            setLoading(true);
            const galleries = await getGalleries();
            setGalleryList(galleries);
        } catch (error) {
            console.error('Failed to fetch galleries:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGalleries();
    }, [fetchGalleries]);

    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <GalleryForm refreshGalleries={fetchGalleries} />
            </div>
            <div className="py-20 px-10">
                <GalleryList
                    galleryList={galleryList}
                    loading={loading}
                    refresh={fetchGalleries}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
