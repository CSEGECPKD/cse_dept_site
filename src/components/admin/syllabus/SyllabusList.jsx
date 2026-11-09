'use client';

import React, { useState } from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import SyllabusForm from './SyllabusForm';
import { deleteSyllabus } from '@/actions/syllabus.action';

const SyllabusList = ({ syllabusList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'course',
            header: 'Course',
            sortable: true,
            cell: (item) => (
                <span className="font-medium">
                    {typeof item.course === 'object'
                        ? item.course?.name
                        : item.course}
                </span>
            ),
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
                    onEdit={() => setEditingItem(item)}
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
        <>
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
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Syllabus"
                description="Update syllabus course, scheme, and PDF."
            >
                {editingItem && (
                    <SyllabusForm
                        initialData={editingItem}
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

export default SyllabusList;
