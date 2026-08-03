'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteSyllabus } from '@/actions/syllabus.action';

const SyllabusList = ({ syllabusList }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">SYLLABUS LIST</h2>
            <ul className="space-y-1">
                {syllabusList.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.course}
                        handleDelete={async () => {
                            await deleteSyllabus(item._id);
                        }}
                    />
                ))}
                {syllabusList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default SyllabusList;
