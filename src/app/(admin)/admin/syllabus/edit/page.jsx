'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getSyllabi } from '@/actions/syllabus.action';
import SyllabusForm from '@/components/admin/syllabus/SyllabusForm';
import SyllabusList from '@/components/admin/syllabus/SyllabusList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <SyllabusForm refreshSyllabi={fetchSyllabi} />
            </div>
            <div className="py-20 px-10">
                <SyllabusList
                    syllabusList={syllabusList}
                    loading={loading}
                    refresh={fetchSyllabi}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
