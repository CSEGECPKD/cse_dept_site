'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteFaculty } from '@/actions/faculty.action';

const FacultyList = ({ facultyList }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">FACULTY LIST</h2>
            <ul className="space-y-1">
                {facultyList.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.name}
                        handleDelete={async () => {
                            await deleteFaculty(item._id);
                        }}
                    />
                ))}
                {facultyList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default FacultyList;
