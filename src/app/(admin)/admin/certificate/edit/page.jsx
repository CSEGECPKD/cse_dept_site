import { getCertificates } from '@/actions/certificate.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import CertificateForm from '@/components/admin/certificate/CertificateForm';
import CertificateList from '@/components/admin/certificate/certificateList';
import React from 'react';

const EditAccreditionPage = async () => {
    const certificateList = await getCertificates();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <CertificateForm />
            </div>
            <div className="py-20 px-10">
                <CertificateList certificateList={certificateList} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
