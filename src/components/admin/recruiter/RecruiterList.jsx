'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteRecruiter } from '@/actions/recruiter.action';

const RecruiterList = ({ recruiterList, loading, refresh }) => {
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
                {recruiterList.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.companyName}
                        onSuccess={refresh}
                        handleDelete={async () => {
                            await deleteRecruiter(item._id);
                        }}
                    />
                ))}
                {recruiterList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default RecruiterList;
