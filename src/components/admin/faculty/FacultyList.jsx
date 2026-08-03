'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteFaculty } from '@/actions/faculty.action';

const FacultyList = ({ facultyList, loading, refresh }) => {
    if (loading) {
        return (
            <div className="space-y-1">
                <h2 className="text-right text-3xl font-medium">
                    EMPLOYEE LIST
                </h2>
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">EMPLOYEE LIST</h2>

            <ul className="space-y-1">
                {facultyList.map((item) => {
                    const subtitle = [
                        item.designation,
                        item.employeeType,
                        item.imageUrl ? null : 'NO PHOTO',
                    ]
                        .filter(Boolean)
                        .join(' - ');
                    return (
                        <ListItem
                            key={item._id}
                            title={item.name}
                            subtitle={subtitle}
                            editLink={`/admin/faculty/update/${item._id}`}
                            onSuccess={refresh}
                            handleDelete={async () => {
                                await deleteFaculty(item._id);
                            }}
                        />
                    );
                })}

                {facultyList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default FacultyList;
