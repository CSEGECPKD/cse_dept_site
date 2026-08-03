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
        throw new Error('Failed to create recruiter');
    }
}

export async function getRecruiters() {
    try {
        await dbConnect();
        const recruiters = await Recruiter.find({});
        return JSON.parse(JSON.stringify(recruiters));
    } catch (error) {
        console.error('Failed to fetch recruiters:', error);
        throw new Error('Failed to fetch recruiters');
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
        throw new Error('Failed to delete recruiter');
    }
}
