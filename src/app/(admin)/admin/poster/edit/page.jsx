'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getPosters } from '@/actions/poster.action';
import PosterForm from '@/components/admin/poster/PosterForm';
import PosterList from '@/components/admin/poster/PosterList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditPosterPage = () => {
    const [posterList, setPosterList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosters = useCallback(async () => {
        try {
            setLoading(true);
            const posters = await getPosters();
            setPosterList(posters);
        } catch (error) {
            console.error('Failed to fetch posters:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosters();
    }, [fetchPosters]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Poster"
                        description="Create a new record."
                    >
                        <PosterForm refreshPosters={fetchPosters} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Existing Posters"
                        description="Manage existing records."
                    >
                        <PosterList
                            posterList={posterList}
                            loading={loading}
                            refresh={fetchPosters}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditPosterPage;
