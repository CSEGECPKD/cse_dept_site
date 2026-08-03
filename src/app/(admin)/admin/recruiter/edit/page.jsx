'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getRecruiters } from '@/actions/recruiter.action';
import RecruiterForm from '@/components/admin/recruiter/RecruiterForm';
import RecruiterList from '@/components/admin/recruiter/RecruiterList';

const EditAccreditionPage = () => {
    const [recruiterList, setRecruiterList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecruiters = useCallback(async () => {
        try {
            setLoading(true);
            const recruiters = await getRecruiters();
            setRecruiterList(recruiters);
        } catch (error) {
            console.error('Failed to fetch recruiters:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecruiters();
    }, [fetchRecruiters]);

    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <RecruiterForm refreshRecruiters={fetchRecruiters} />
            </div>
            <div className="py-20 px-10">
                <RecruiterList
                    recruiterList={recruiterList}
                    loading={loading}
                    refresh={fetchRecruiters}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
