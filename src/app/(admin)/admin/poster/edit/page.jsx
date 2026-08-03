'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getPosters } from '@/actions/poster.action';
import PosterForm from '@/components/admin/poster/PosterForm';
import PosterList from '@/components/admin/poster/PosterList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <PosterForm refreshPosters={fetchPosters} />
            </div>
            <div className="py-20 px-10">
                <PosterList
                    posterList={posterList}
                    loading={loading}
                    refresh={fetchPosters}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
