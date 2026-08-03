'use server';

import Topper from '@/lib/models/Topper';
import dbConnect from '../lib/db';
import { isAuthenticated } from '@/lib/auth';

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
        const toppers = await Topper.find().exec();
        return JSON.parse(JSON.stringify(toppers));
    } catch (error) {
        throw error;
    }
};
