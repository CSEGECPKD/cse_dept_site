'use client';

import React from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteSyllabus } from '@/actions/syllabus.action';

const SyllabusList = ({ syllabusList, loading, refresh }) => {
    const columns = [
        {
            key: 'course',
            header: 'Course',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.course}</span>,
        },
        {
            key: 'yearOfScheme',
            header: 'Year of Scheme',
            cell: (item) => item.yearOfScheme,
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteSyllabus(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete syllabus?"
                    deleteDescription="This will permanently remove this syllabus from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={syllabusList}
            loading={loading}
            columns={columns}
            searchKeys={['course', 'yearOfScheme']}
            searchPlaceholder="Search syllabus…"
            emptyState={{
                title: 'No syllabus yet',
                subtitle: 'Your syllabus list is empty.',
            }}
        />
    );
};

export default SyllabusList;
