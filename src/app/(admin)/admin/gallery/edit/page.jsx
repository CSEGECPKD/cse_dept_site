'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getGalleries } from '@/actions/gallery.action';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import GalleryList from '@/components/admin/gallery/GalleryList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditGalleryPage = () => {
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
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Gallery Item"
                        description="Create a new record."
                    >
                        <GalleryForm refreshGalleries={fetchGalleries} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Gallery"
                        description="Manage existing records."
                    >
                        <GalleryList
                            galleryList={galleryList}
                            loading={loading}
                            refresh={fetchGalleries}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditGalleryPage;
