'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteCertificate } from '@/actions/certificate.action';

const CertificateList = ({ certificateList, loading, refresh }) => {
    if (loading) {
        return (
            <div className="space-y-1">
                <h2 className="text-right text-3xl font-medium">
                    ALREADY ON SITE
                </h2>
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">ALREADY ON SITE</h2>
            <ul className="space-y-1">
                {certificateList.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.name}
                        onSuccess={refresh}
                        handleDelete={async () => {
                            await deleteCertificate(item._id);
                        }}
                    />
                ))}
                {certificateList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default CertificateList;
