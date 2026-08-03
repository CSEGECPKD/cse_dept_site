'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getMagazines } from '@/actions/magazine.action';
import MagazineForm from '@/components/admin/magazine/MagazineForm';
import MagazineList from '@/components/admin/magazine/MagazineList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditMagazinePage = () => {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMagazines = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getMagazines();
            setMagazines(data);
        } catch (error) {
            console.error('Failed to fetch magazines:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMagazines();
    }, [fetchMagazines]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Magazine"
                        description="Create a new record."
                    >
                        <MagazineForm refreshMagazines={fetchMagazines} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Published Magazines"
                        description="Manage existing records."
                    >
                        <MagazineList
                            magazines={magazines}
                            loading={loading}
                            refresh={fetchMagazines}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditMagazinePage;
