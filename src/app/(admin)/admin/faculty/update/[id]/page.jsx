'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserRound } from 'lucide-react';

import { getFacultyById } from '@/actions/faculty.action';
import FacultyEditForm from '@/components/admin/faculty/FacultyEditForm';
import SectionCard from '@/components/admin/ui/SectionCard';
import PageHeader from '@/components/admin/ui/PageHeader';
import EmptyState from '@/components/admin/ui/EmptyState';
import { FormSkeleton } from '@/components/admin/ui/LoadingSkeleton';

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

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <PageHeader
                title="Edit Employee"
                description="Update employee details."
            />
            <SectionCard title="Employee Information">
                {loading ? (
                    <FormSkeleton fields={6} />
                ) : !faculty ? (
                    <EmptyState
                        icon={UserRound}
                        title="Employee not found"
                        subtitle="This employee may have been deleted."
                    />
                ) : (
                    <FacultyEditForm faculty={faculty} />
                )}
            </SectionCard>
        </div>
    );
};

export default UpdateFacultyPage;
