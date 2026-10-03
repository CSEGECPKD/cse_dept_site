'use server'

import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { isAuthenticated } from '@/lib/auth';

export async function getBlogs() {
    try {
        await dbConnect();
        const blogs = await Blog.find({});
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        throw new Error('Failed to fetch blogs');
    }
}

export async function createBlog({ name, authorName, type, authorPosition, authorImage, authorLinkedin }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newBlog = new Blog({ name, authorName, type, authorPosition, authorImage, authorLinkedin });
        await newBlog.save();
        return {
            message: "Blog created successfully"
        };
    } catch (error) {
        console.error('Failed to create blog:', error);
        throw new Error('Failed to create blog');
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
        throw new Error('Failed to delete blog');
    }
}
