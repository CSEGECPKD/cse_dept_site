'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { getFacultyById } from '@/actions/faculty.action';
import FacultyEditForm from '@/components/admin/faculty/FacultyEditForm';

const UpdateFacultyPage = () => {
    const { id } = useParams();
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFacultyById(id)
            .then(setFaculty)
            .catch((error) => console.error('Failed to fetch employee:', error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <p className="py-20 text-center">Loading...</p>;
    }

    if (!faculty) {
        return (
            <p className="py-20 text-center text-red-500">
                Employee not found
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-10 py-20">
            <h1 className="mb-8 text-right text-3xl font-medium">
                EDIT EMPLOYEE
            </h1>
            <FacultyEditForm faculty={faculty} />
        </div>
    );
};

export default UpdateFacultyPage;
