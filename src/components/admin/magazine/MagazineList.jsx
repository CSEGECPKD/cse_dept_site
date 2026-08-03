'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteMagazine } from '@/actions/magazine.action';

const MagazineList = ({ magazines, loading, refresh }) => {
    if (loading) {
        return (
            <div className="space-y-1">
                <h2 className="text-right text-3xl font-medium">
                    PUBLISHED MAGAZINES
                </h2>
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">
                PUBLISHED MAGAZINES
            </h2>
            <ul className="space-y-1">
                {magazines.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.name}
                        onSuccess={refresh}
                        handleDelete={async () => {
                            await deleteMagazine(item._id);
                        }}
                    />
                ))}
                {magazines.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default MagazineList;
