'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getMagazines } from '@/actions/magazine.action';
import MagazineForm from '@/components/admin/magazine/MagazineForm';
import MagazineList from '@/components/admin/magazine/MagazineList';

const EditAccreditionPage = () => {
    const [magazineList, setMagazineList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMagazines = useCallback(async () => {
        try {
            setLoading(true);
            const magazines = await getMagazines();
            setMagazineList(magazines);
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <MagazineForm refreshMagazines={fetchMagazines} />
            </div>
            <div className="py-20 px-10">
                <MagazineList
                    magazines={magazineList}
                    loading={loading}
                    refresh={fetchMagazines}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
