'use client';

import React from 'react';
import { Image } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteCourse } from '@/actions/course.action';

const CourseList = ({ courseList, loading, refresh }) => {
    const columns = [
        {
            key: 'imageUrl',
            header: 'Image',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                    {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <Image className="h-5 w-5" />
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
    );
};

export default CourseList;
