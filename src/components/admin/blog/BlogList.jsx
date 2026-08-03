'use client';

import React from 'react';
import { UserRound } from 'lucide-react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import StatusBadge from '../ui/StatusBadge';
import { deleteBlog } from '@/actions/blog.action';

const BlogList = ({ blogList, loading, refresh }) => {
    const columns = [
        {
            key: 'authorImage',
            header: 'Photo',
            cell: (item) => (
                <div className="h-10 w-10 overflow-hidden rounded-full border bg-muted">
                    {item.authorImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={item.authorImage}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <UserRound className="h-5 w-5" />
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
            key: 'authorName',
            header: 'Author',
            cell: (item) => item.authorName,
        },
        {
            key: 'type',
            header: 'Type',
            cell: (item) => (
                <StatusBadge variant="secondary">{item.type}</StatusBadge>
            ),
        },
        {
            key: 'authorPosition',
            header: 'Position',
            cell: (item) => item.authorPosition,
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteBlog(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete blog?"
                    deleteDescription="This will permanently remove this blog from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={blogList}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'authorName', 'type']}
            searchPlaceholder="Search blogs…"
            emptyState={{
                title: 'No blogs yet',
                subtitle: 'Your blog list is empty.',
            }}
        />
    );
};

export default BlogList;
