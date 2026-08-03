'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getBlogs } from '@/actions/blog.action';
import BlogForm from '@/components/admin/blog/BlogForm';
import BlogList from '@/components/admin/blog/BlogList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditBlogPage = () => {
    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            const blogs = await getBlogs();
            setBlogList(blogs);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Blog"
                        description="Create a new record."
                    >
                        <BlogForm refreshBlogs={fetchBlogs} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Published Blogs"
                        description="Manage existing records."
                    >
                        <BlogList
                            blogList={blogList}
                            loading={loading}
                            refresh={fetchBlogs}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditBlogPage;
