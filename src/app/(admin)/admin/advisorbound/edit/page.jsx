'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getAdvisoryBoardMembers } from '@/actions/advisoryboard.action';
import AdvisoryBoardForm from '@/components/admin/advisorbound/AdvisorBoundForm';
import AdvisoryBoardList from '@/components/admin/advisorbound/AdvisoryBoardList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <AdvisoryBoardForm refreshAdvisors={fetchAdvisoryBoard} />
            </div>
            <div className="py-20 px-10">
                <AdvisoryBoardList
                    advisoryBoardList={advisoryBoardList}
                    loading={loading}
                    refresh={fetchAdvisoryBoard}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
