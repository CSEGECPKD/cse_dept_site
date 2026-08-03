'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getTopperList } from '@/actions/topper.action';
import TopperForm from '@/components/admin/toppers/TopperForm';
import TopperList from '@/components/admin/toppers/TopperList';

const EditAccreditionPage = () => {
    const [topperList, setTopperList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchToppers = useCallback(async () => {
        try {
            setLoading(true);
            const toppers = await getTopperList();
            setTopperList(toppers);
        } catch (error) {
            console.error('Failed to fetch toppers:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchToppers();
    }, [fetchToppers]);

    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <TopperForm refreshToppers={fetchToppers} />
            </div>
            <div className="py-20 px-10">
                <TopperList
                    topperList={topperList}
                    loading={loading}
                    refresh={fetchToppers}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
