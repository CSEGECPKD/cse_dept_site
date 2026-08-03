'use client';

import React from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteStudent } from '@/actions/student.action';

const StudentList = ({ studentList, loading, refresh }) => {
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
    );
};

export default StudentList;
