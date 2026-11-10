'use server';

import Topper from '@/lib/models/Topper';
import dbConnect from '../lib/db';
import { isAuthenticated } from '@/lib/auth';
import studentsByCategory from '@/constants/contents';

// Convert flat static data to the same [{category, name, batch, cgpa, sem, imageUrl}] shape
const STATIC_TOPPERS = Object.entries(studentsByCategory).flatMap(
    ([category, students]) =>
        students.map((s) => ({
            _id: null,
            category,
            name: s.name,
            batch: s.batch || '',
            course: '',
            year: '',
            sem: s.desc || '',
            cgpa: s.cgpa || 0,
            sgpa: 0,
            imageUrl: s.image || '',
        }))
);

export const createTopper = async (data) => {
    try {
        await dbConnect();
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const topper = new Topper(data);
        await topper.save();
        return {
            message: 'Created successfully',
        };
    } catch (error) {
        throw error;
    }
};

export const updateTopper = async (id, data) => {
    try {
        await dbConnect();
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const updatedTopper = await Topper.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedTopper) {
            throw new Error('Topper not found');
        }
        return {
            message: 'Updated successfully',
        };
    } catch (error) {
        throw error;
    }
};

export const deleteTopper = async (id) => {
    try {
        await dbConnect();
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await Topper.findByIdAndDelete(id);
        return true;
    } catch (error) {
        throw error;
    }
};

export const getTopperList = async () => {
    try {
        await dbConnect();
        const toppers = await Topper.find().lean().exec();
        const list = JSON.parse(JSON.stringify(toppers));
        return list.length > 0 ? list : STATIC_TOPPERS;
    } catch (error) {
        console.error('Failed to fetch toppers, using fallback:', error);
        return STATIC_TOPPERS;
    }
};
