'use server';

import dbConnect from '@/lib/db';
import Student from '@/lib/models/Student';
import { isAuthenticated } from '@/lib/auth';

export async function createStudent({ course, batch, name }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newStudent = new Student({ course, batch, name });
        await newStudent.save();
        return {
            message: 'Created successfully',
        };
    } catch (error) {
        console.error('Failed to create student:', error);
        throw new Error('Failed to create student');
    }
}

export async function getStudents() {
    try {
        await dbConnect();
        const students = await Student.find({}).populate('course').lean();
        return JSON.parse(JSON.stringify(students));
    } catch (error) {
        console.error('Failed to fetch students:', error);
        throw new Error('Failed to fetch students');
    }
}

export async function updateStudent(studentId, { course, batch, name }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { course, batch, name },
            { new: true }
        );
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return { message: 'Student updated successfully' };
    } catch (error) {
        console.error('Failed to update student:', error);
        throw new Error(error.message || 'Failed to update student');
    }
}

export async function deleteStudent(studentId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            throw new Error('Student not found');
        }
        return { message: 'Student deleted successfully' };
    } catch (error) {
        console.error('Failed to delete student:', error);
        throw new Error('Failed to delete student');
    }
}
