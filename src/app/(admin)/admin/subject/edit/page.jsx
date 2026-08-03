'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getSubjects } from '@/actions/subject.action';
import SubjectForm from '@/components/admin/subject/SubjectForm';
import SubjectList from '@/components/admin/subject/SubjectList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <SubjectForm refreshSubjects={fetchSubjects} />
            </div>
            <div className="py-20 px-10">
                <SubjectList
                    subjectList={subjectList}
                    loading={loading}
                    refresh={fetchSubjects}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
