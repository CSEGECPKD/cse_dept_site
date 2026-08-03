'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getSubjects } from '@/actions/subject.action';
import SubjectForm from '@/components/admin/subject/SubjectForm';
import SubjectList from '@/components/admin/subject/SubjectList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditSubjectPage = () => {
    const [subjectList, setSubjectList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubjects = useCallback(async () => {
        try {
            setLoading(true);
            const subjects = await getSubjects();
            setSubjectList(subjects);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Subject"
                        description="Create a new record."
                    >
                        <SubjectForm refreshSubjects={fetchSubjects} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Existing Subjects"
                        description="Manage existing records."
                    >
                        <SubjectList
                            subjectList={subjectList}
                            loading={loading}
                            refresh={fetchSubjects}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditSubjectPage;
