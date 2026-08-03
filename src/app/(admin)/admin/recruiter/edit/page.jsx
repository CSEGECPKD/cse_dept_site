'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getRecruiters } from '@/actions/recruiter.action';
import RecruiterForm from '@/components/admin/recruiter/RecruiterForm';
import RecruiterList from '@/components/admin/recruiter/RecruiterList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditRecruiterPage = () => {
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
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Recruiter"
                        description="Create a new record."
                    >
                        <RecruiterForm refreshRecruiters={fetchRecruiters} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Recruiting Companies"
                        description="Manage existing records."
                    >
                        <RecruiterList
                            recruiterList={recruiterList}
                            loading={loading}
                            refresh={fetchRecruiters}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditRecruiterPage;
