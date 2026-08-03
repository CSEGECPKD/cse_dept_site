'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getTopperList } from '@/actions/topper.action';
import TopperForm from '@/components/admin/toppers/TopperForm';
import TopperList from '@/components/admin/toppers/TopperList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditTopperPage = () => {
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
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Topper"
                        description="Create a new record."
                    >
                        <TopperForm refreshToppers={fetchToppers} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Toppers"
                        description="Manage existing records."
                    >
                        <TopperList
                            topperList={topperList}
                            loading={loading}
                            refresh={fetchToppers}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditTopperPage;
