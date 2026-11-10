'use server';

import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { isAuthenticated } from '@/lib/auth';
import { blogSchema } from '@/lib/validations';

export async function getBlogs() {
    try {
        const conn = await dbConnect();
        if (!conn) return [];
        const blogs = await Blog.find({}).lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Failed to fetch blogs:', error.message || error);
        return [];
    }
}

export async function getBlogById(id) {
    try {
        if (!id) return null;
        const conn = await dbConnect();
        if (!conn) return null;
        if (mongoose.Types.ObjectId.isValid(id)) {
            const blog = await Blog.findById(id).lean();
            if (blog) {
                return JSON.parse(JSON.stringify(blog));
            }
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch blog by id:', error.message || error);
        return null;
    }
}

export async function createBlog(data) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const validated = blogSchema.parse(data);
        await dbConnect();
        const newBlog = new Blog(validated);
        await newBlog.save();
        return {
            message: 'Blog created successfully',
        };
    } catch (error) {
        console.error('Failed to create blog:', error);
        throw new Error(error.message || 'Failed to create blog');
    }
}

export async function updateBlog(blogId, data) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const validated = blogSchema.parse(data);
        await dbConnect();
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, validated, {
            new: true,
        });
        if (!updatedBlog) {
            throw new Error('Blog not found');
        }
        return { message: 'Blog updated successfully' };
    } catch (error) {
        console.error('Failed to update blog:', error);
        throw new Error(error.message || 'Failed to update blog');
    }
}

export async function deleteBlog(blogId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            throw new Error('Blog not found');
        }
        return { message: 'Blog deleted successfully' };
    } catch (error) {
        console.error('Failed to delete blog:', error);
        throw new Error(error.message || 'Failed to delete blog');
    }
}
