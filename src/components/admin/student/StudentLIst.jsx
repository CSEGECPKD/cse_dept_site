'use client';

import React, { useState } from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import StudentForm from './StudentForm';
import { deleteStudent } from '@/actions/student.action';

const StudentList = ({ courses = [], studentList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'course',
            header: 'Course',
            sortable: true,
            cell: (item) => item.course?.name || '—',
        },
        {
            key: 'batch',
            header: 'Batch',
            cell: (item) => item.batch,
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onEdit={() => setEditingItem(item)}
                    onDelete={async () => {
                        await deleteStudent(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete student?"
                    deleteDescription="This will permanently remove this student from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={studentList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'batch', (item) => item.course?.name]}
                searchPlaceholder="Search students…"
                emptyState={{
                    title: 'No students yet',
                    subtitle: 'Your student list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Student"
                description="Update student name, course, and batch."
            >
                {editingItem && (
                    <StudentForm
                        initialData={editingItem}
                        courses={courses}
                        onSuccess={() => {
                            setEditingItem(null);
                            refresh();
                        }}
                        onCancel={() => setEditingItem(null)}
                    />
                )}
            </EditDialog>
        </>
    );
};

export default StudentList;
