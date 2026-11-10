'use server';

import dbConnect from '@/lib/db';
import StudentGroup from '@/lib/models/StudentGroup';
import { isAuthenticated } from '@/lib/auth';

export async function createStudentGroup({ name, description, logoUrl }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newStudentGroup = new StudentGroup({
            name,
            description,
            logoUrl,
        });
        await newStudentGroup.save();
        return {
            data: 'Successfully Created',
        };
    } catch (error) {
        console.error('Failed to create student group:', error);
        throw new Error(error.message || 'Failed to create student group');
    }
}

export async function getStudentGroups() {
    try {
        const conn = await dbConnect();
        if (!conn) return [];
        const studentGroups = await StudentGroup.find({}).lean();
        return JSON.parse(JSON.stringify(studentGroups));
    } catch (error) {
        console.error('Failed to fetch student groups:', error.message || error);
        return [];
    }
}

export async function updateStudentGroup(
    studentGroupId,
    { name, description, logoUrl }
) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const updatedStudentGroup = await StudentGroup.findByIdAndUpdate(
            studentGroupId,
            { name, description, logoUrl },
            { new: true }
        );
        if (!updatedStudentGroup) {
            throw new Error('Student group not found');
        }
        return { message: 'Student group updated successfully' };
    } catch (error) {
        console.error('Failed to update student group:', error);
        throw new Error(error.message || 'Failed to update student group');
    }
}

export async function deleteStudentGroup(studentGroupId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedStudentGroup =
            await StudentGroup.findByIdAndDelete(studentGroupId);
        if (!deletedStudentGroup) {
            throw new Error('Student group not found');
        }
        return { message: 'Student group deleted successfully' };
    } catch (error) {
        console.error('Failed to delete student group:', error);
        throw new Error(error.message || 'Failed to delete student group');
    }
}
