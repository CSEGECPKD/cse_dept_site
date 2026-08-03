'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getStudentGroups } from '@/actions/studentgroup.action';
import StudentGroupForm from '@/components/admin/studentgroup/StudentGroupForm';
import StudentGroupList from '@/components/admin/studentgroup/StudentGroupList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <StudentGroupForm refreshStudentGroups={fetchStudentGroups} />
            </div>
            <div className="py-20 px-10">
                <StudentGroupList
                    studentGroupList={studentGroupList}
                    loading={loading}
                    refresh={fetchStudentGroups}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
