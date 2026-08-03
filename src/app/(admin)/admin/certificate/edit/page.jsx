'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getCertificates } from '@/actions/certificate.action';
import CertificateForm from '@/components/admin/certificate/CertificateForm';
import CertificateList from '@/components/admin/certificate/certificateList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditCertificatePage = () => {
    const [certificateList, setCertificateList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCertificates = useCallback(async () => {
        try {
            setLoading(true);
            const certificates = await getCertificates();
            setCertificateList(certificates);
        } catch (error) {
            console.error('Failed to fetch certificates:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCertificates();
    }, [fetchCertificates]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Certificate"
                        description="Create a new record."
                    >
                        <CertificateForm
                            refreshCertificates={fetchCertificates}
                        />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Certificates"
                        description="Manage existing records."
                    >
                        <CertificateList
                            certificateList={certificateList}
                            loading={loading}
                            refresh={fetchCertificates}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditCertificatePage;
