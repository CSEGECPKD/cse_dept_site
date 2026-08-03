'use client';

import React from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteSubject } from '@/actions/subject.action';

const SubjectList = ({ subjectList, loading, refresh }) => {
    const columns = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'subCode',
            header: 'Subject Code',
            cell: (item) => item.subCode,
        },
        {
            key: 'courseId',
            header: 'Course ID',
            cell: (item) => item.courseId,
        },
        {
            key: 'yearOfScheme',
            header: 'Year of Scheme',
            cell: (item) => item.yearOfScheme,
        },
        {
            key: 'semester',
            header: 'Semester',
            cell: (item) => item.semester,
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteSubject(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete subject?"
                    deleteDescription="This will permanently remove this subject from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={subjectList}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'subCode', 'courseId']}
            searchPlaceholder="Search subjects…"
            emptyState={{
                title: 'No subjects yet',
                subtitle: 'Your subject list is empty.',
            }}
        />
    );
};

export default SubjectList;
