'use server';

import dbConnect from '@/lib/db';
import Subject from '@/lib/models/Subject';
import Course from '@/lib/models/Course';
import { isAuthenticated } from '@/lib/auth';

export async function createSubject({
    courseId,
    yearOfScheme,
    semester,
    subCode,
    name,
    description,
    pdfUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        const newSubject = new Subject({
            courseId,
            yearOfScheme,
            semester,
            subCode,
            name,
            description,
            pdfUrl,
        });
        await newSubject.save();
        return {
            message: 'Subject created successfully',
        };
    } catch (error) {
        console.error('Failed to create subject:', error);
        throw new Error('Failed to create subject');
    }
}

export async function getSubjects() {
    try {
        await dbConnect();
        const subjects = await Subject.find({}).populate('courseId');
        return JSON.parse(JSON.stringify(subjects));
    } catch (error) {
        console.error('Failed to fetch subjects:', error);
        throw new Error('Failed to fetch subjects');
    }
}

export async function deleteSubject(subjectId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedSubject = await Subject.findByIdAndDelete(subjectId);
        if (!deletedSubject) {
            throw new Error('Subject not found');
        }
        return { message: 'Subject deleted successfully' };
    } catch (error) {
        console.error('Failed to delete subject:', error);
        throw new Error('Failed to delete subject');
    }
}
