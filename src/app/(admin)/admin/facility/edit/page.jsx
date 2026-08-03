'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getFacilities } from '@/actions/facility.action';
import FacilityForm from '@/components/admin/facility/FacilityForm';
import FacilityList from '@/components/admin/facility/FacilityList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditFacilityPage = () => {
    const [facilityList, setFacilityList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFacilities = useCallback(async () => {
        try {
            setLoading(true);
            const facilities = await getFacilities();
            setFacilityList(facilities);
        } catch (error) {
            console.error('Failed to fetch facilities:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFacilities();
    }, [fetchFacilities]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Facility"
                        description="Create a new record."
                    >
                        <FacilityForm refreshFacilities={fetchFacilities} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Facilities"
                        description="Manage existing records."
                    >
                        <FacilityList
                            facilityList={facilityList}
                            loading={loading}
                            refresh={fetchFacilities}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditFacilityPage;
