'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getSyllabi } from '@/actions/syllabus.action';
import SyllabusForm from '@/components/admin/syllabus/SyllabusForm';
import SyllabusList from '@/components/admin/syllabus/SyllabusList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditSyllabusPage = () => {
    const [syllabusList, setSyllabusList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSyllabi = useCallback(async () => {
        try {
            setLoading(true);
            const syllabi = await getSyllabi();
            setSyllabusList(syllabi);
        } catch (error) {
            console.error('Failed to fetch syllabi:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSyllabi();
    }, [fetchSyllabi]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Syllabus"
                        description="Create a new record."
                    >
                        <SyllabusForm refreshSyllabi={fetchSyllabi} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Existing Syllabus"
                        description="Manage existing records."
                    >
                        <SyllabusList
                            syllabusList={syllabusList}
                            loading={loading}
                            refresh={fetchSyllabi}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditSyllabusPage;
