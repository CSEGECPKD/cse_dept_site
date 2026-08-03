'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getCertificates } from '@/actions/certificate.action';
import CertificateForm from '@/components/admin/certificate/CertificateForm';
import CertificateList from '@/components/admin/certificate/certificateList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <CertificateForm refreshCertificates={fetchCertificates} />
            </div>
            <div className="py-20 px-10">
                <CertificateList
                    certificateList={certificateList}
                    loading={loading}
                    refresh={fetchCertificates}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
