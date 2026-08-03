'use client';

import React from 'react';

import AccreditionForm from '@/components/admin/accredition/AccreditionForm';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditAccreditionPage = () => {
    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Accreditation"
                        description="Create a new accreditation record."
                    >
                        <AccreditionForm />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Accreditations"
                        description="Currently listed accreditations."
                    >
                        <AccreditionList />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditAccreditionPage;
