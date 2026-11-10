'use server';

import dbConnect from '@/lib/db';
import Recruiter from '@/lib/models/Recruiter';
import { isAuthenticated } from '@/lib/auth';

export async function createRecruiter({ companyName, companyLogo }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newRecruiter = new Recruiter({ companyName, companyLogo });
        await newRecruiter.save();
        return {
            message: 'Recruiter created successfully',
        };
    } catch (error) {
        console.error('Failed to create recruiter:', error);
        throw new Error(error.message || 'Failed to create recruiter');
    }
}

export async function getRecruiters() {
    try {
        const conn = await dbConnect();
        if (!conn) return [];
        const recruiters = await Recruiter.find({}).lean();
        return JSON.parse(JSON.stringify(recruiters));
    } catch (error) {
        console.error('Failed to fetch recruiters:', error.message || error);
        return [];
    }
}

export async function updateRecruiter(
    recruiterId,
    { companyName, companyLogo }
) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(
            recruiterId,
            { companyName, companyLogo },
            { new: true }
        );
        if (!updatedRecruiter) {
            throw new Error('Recruiter not found');
        }
        return { message: 'Recruiter updated successfully' };
    } catch (error) {
        console.error('Failed to update recruiter:', error);
        throw new Error(error.message || 'Failed to update recruiter');
    }
}

export async function deleteRecruiter(recruiterId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedRecruiter = await Recruiter.findByIdAndDelete(recruiterId);
        if (!deletedRecruiter) {
            throw new Error('Recruiter not found');
        }
        return { message: 'Recruiter deleted successfully' };
    } catch (error) {
        console.error('Failed to delete recruiter:', error);
        throw new Error(error.message || 'Failed to delete recruiter');
    }
}
