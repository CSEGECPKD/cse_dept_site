'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getFaculties } from '@/actions/faculty.action';
import FacultyForm from '@/components/admin/faculty/FacultyForm';
import FacultyImport from '@/components/admin/faculty/FacultyImport';
import FacultyList from '@/components/admin/faculty/FacultyList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditFacultyPage = () => {
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFaculties = useCallback(async () => {
        try {
            setLoading(true);
            const facultiesData = await getFaculties();
            setFaculties(facultiesData);
        } catch (error) {
            console.error('Failed to fetch faculties:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFaculties();
    }, [fetchFaculties]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Employee"
                        description="Create a new employee record."
                    >
                        <FacultyForm refreshFaculties={fetchFaculties} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Employees"
                        description="Manage existing employee records."
                    >
                        <FacultyList
                            facultyList={faculties}
                            loading={loading}
                            refresh={fetchFaculties}
                        />
                    </SectionCard>
                }
                extra={
                    <SectionCard
                        title="Bulk Import Employees"
                        description="Import multiple employees from an Excel or CSV file."
                    >
                        <FacultyImport refreshFaculties={fetchFaculties} />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditFacultyPage;
