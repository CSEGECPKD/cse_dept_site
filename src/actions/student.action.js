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
            message: 'Created sucessfully',
        };
    } catch (error) {
        console.error('Failed to create student:', error);
        throw new Error('Failed to create student');
    }
}

export async function getStudents() {
    try {
        await dbConnect();
        const students = await Student.find({}).populate('course');
        return students;
    } catch (error) {
        console.error('Failed to fetch students:', error);
        throw new Error('Failed to fetch students');
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
