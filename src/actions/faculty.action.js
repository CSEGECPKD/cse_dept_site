'use server';

import dbConnect from '../lib/db';
import Faculty from '../lib/models/Faculty';
import { isAuthenticated } from '../lib/auth';

export async function getFaculties() {
    try {
        await dbConnect();
        const faculties = await Faculty.find({});
        return JSON.parse(JSON.stringify(faculties));
    } catch (error) {
        console.error('Failed to fetch faculties:', error);
        throw new Error('Failed to fetch faculties');
    }
}

export async function createFaculty({
    type,
    name,
    yearOfJoin,
    yearOfDept,
    designation,
    emailId,
    qualification,
    imageUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newFaculty = new Faculty({
            type,
            name,
            yearOfJoin,
            yearOfDept,
            designation,
            emailId,
            qualification,
            imageUrl,
        });
        await newFaculty.save();
        return {
            message: 'Created Succesfully',
        };
    } catch (error) {
        console.error('Failed to create faculty:', error);
        throw new Error('Failed to create faculty');
    }
}

export async function deleteFaculty(facultyId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);
        if (!deletedFaculty) {
            throw new Error('Faculty not found');
        }
        return { message: 'Faculty deleted successfully' };
    } catch (error) {
        console.error('Failed to delete faculty:', error);
        throw new Error('Failed to delete faculty');
    }
}
