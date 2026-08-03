'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteStudent } from '@/actions/student.action';

const StudentList = ({ studentList }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">
                STUDENTS ON SITE
            </h2>
            <ul className="space-y-1">
                {studentList.map((student) => (
                    <ListItem
                        key={student._id}
                        title={`${student.name} - ${student.course} (${student.batch})`}
                        handleDelete={async () => {
                            await deleteStudent(student._id);
                        }}
                    />
                ))}
                {studentList.length === 0 && (
                    <p className="text-center text-red-500">
                        No Students Found
                    </p>
                )}
            </ul>
        </div>
    );
};

export default StudentList;
