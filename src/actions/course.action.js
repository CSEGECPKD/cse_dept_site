'use server';

import dbConnect from '@/lib/db';
import Course from '@/lib/models/Course';
import { isAuthenticated } from '@/lib/auth';

export async function createCourse({ name, description, imageUrl, pdfUrl }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newCourse = new Course({ name, description, imageUrl, pdfUrl });
        await newCourse.save();
        return {
            message: 'Course created successfully',
        };
    } catch (error) {
        console.error('Failed to create course:', error);
        throw new Error('Failed to create course');
    }
}

export async function getCourses() {
    try {
        await dbConnect();
        const courses = await Course.find({});
        return JSON.parse(JSON.stringify(courses));
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        throw new Error('Failed to fetch courses');
    }
}

export async function deleteCourse(courseId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            throw new Error('Course not found');
        }
        return { message: 'Course deleted successfully' };
    } catch (error) {
        console.error('Failed to delete course:', error);
        throw new Error('Failed to delete course');
    }
}
