'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getStudentGroups } from '@/actions/studentgroup.action';
import StudentGroupForm from '@/components/admin/studentgroup/StudentGroupForm';
import StudentGroupList from '@/components/admin/studentgroup/StudentGroupList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditStudentGroupPage = () => {
    const [studentGroupList, setStudentGroupList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudentGroups = useCallback(async () => {
        try {
            setLoading(true);
            const studentGroups = await getStudentGroups();
            setStudentGroupList(studentGroups);
        } catch (error) {
            console.error('Failed to fetch student groups:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudentGroups();
    }, [fetchStudentGroups]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Student Group"
                        description="Create a new record."
                    >
                        <StudentGroupForm
                            refreshStudentGroups={fetchStudentGroups}
                        />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Student Groups"
                        description="Manage existing records."
                    >
                        <StudentGroupList
                            studentGroupList={studentGroupList}
                            loading={loading}
                            refresh={fetchStudentGroups}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditStudentGroupPage;
