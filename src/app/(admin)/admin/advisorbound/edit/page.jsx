'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getAdvisoryBoardMembers } from '@/actions/advisoryboard.action';
import AdvisorBoundForm from '@/components/admin/advisorbound/AdvisorBoundForm';
import AdvisoryBoardList from '@/components/admin/advisorbound/AdvisoryBoardList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditAdvisorBoundPage = () => {
    const [advisoryBoardList, setAdvisoryBoardList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdvisoryBoard = useCallback(async () => {
        try {
            setLoading(true);
            const advisors = await getAdvisoryBoardMembers();
            setAdvisoryBoardList(advisors);
        } catch (error) {
            console.error('Failed to fetch advisory board members:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdvisoryBoard();
    }, [fetchAdvisoryBoard]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Advisor"
                        description="Create a new record."
                    >
                        <AdvisorBoundForm
                            refreshAdvisors={fetchAdvisoryBoard}
                        />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Advisor Board"
                        description="Manage existing records."
                    >
                        <AdvisoryBoardList
                            advisoryBoardList={advisoryBoardList}
                            loading={loading}
                            refresh={fetchAdvisoryBoard}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditAdvisorBoundPage;
