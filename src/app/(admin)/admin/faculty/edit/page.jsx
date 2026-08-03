'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getFaculties } from '@/actions/faculty.action';
import FacultyForm from '@/components/admin/faculty/FacultyForm';
import FacultyImport from '@/components/admin/faculty/FacultyImport';
import FacultyList from '@/components/admin/faculty/FacultyList';

const EditAccreditionPage = () => {
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
        <div className="space-y-10">
            <div className="grid grid-cols-2">
                <div className="py-20 px-20">
                    <FacultyForm refreshFaculties={fetchFaculties} />
                </div>

                <div className="py-20 px-10">
                    <FacultyList
                        facultyList={faculties}
                        loading={loading}
                        refresh={fetchFaculties}
                    />
                </div>
            </div>

            <div className="px-20 pb-20">
                <FacultyImport refreshFaculties={fetchFaculties} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
