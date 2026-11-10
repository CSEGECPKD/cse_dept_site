'use client';

import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import CourseForm from './CourseForm';
import { deleteCourse } from '@/actions/course.action';

const CourseList = ({ courseList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'imageUrl',
            header: 'Image',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.imageUrl ? (
                        <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-5 w-5" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'description',
            header: 'Description',
            cell: (item) => (
                <span className="text-muted-foreground">
                    {item.description}
                </span>
            ),
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onEdit={() => setEditingItem(item)}
                    onDelete={async () => {
                        await deleteCourse(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete course?"
                    deleteDescription="This will permanently remove this course from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={courseList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'description']}
                searchPlaceholder="Search courses…"
                emptyState={{
                    title: 'No courses yet',
                    subtitle: 'Your course list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Course"
                description="Update course details and attachments."
            >
                {editingItem && (
                    <CourseForm
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

export default CourseList;
