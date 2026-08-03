'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getBlogs } from '@/actions/blog.action';
import BlogForm from '@/components/admin/blog/BlogForm';
import BlogList from '@/components/admin/blog/BlogList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <BlogForm refreshBlogs={fetchBlogs} />
            </div>
            <div className="py-20 px-10">
                <BlogList
                    blogList={blogList}
                    loading={loading}
                    refresh={fetchBlogs}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
