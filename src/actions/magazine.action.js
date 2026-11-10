'use server';

import dbConnect from '../lib/db';
import Magazine from '../lib/models/Magazine';
import { isAuthenticated } from '../lib/auth';
import { magazineSchema } from '../lib/validations';

export async function getMagazines() {
    try {
        const conn = await dbConnect();
        if (!conn) return [];
        const magazines = await Magazine.find({}).sort({ date: -1 }).lean();
        return JSON.parse(JSON.stringify(magazines));
    } catch (error) {
        console.error('Failed to fetch magazines:', error.message || error);
        return [];
    }
}

export async function createMagazine(data) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const validated = magazineSchema.parse({
            ...data,
            date:
                data?.date instanceof Date
                    ? data.date.toISOString()
                    : String(data?.date ?? ''),
        });
        await dbConnect();
        const newMagazine = new Magazine({
            ...validated,
            date: new Date(validated.date),
        });
        await newMagazine.save();
        return {
            message: 'Success',
        };
    } catch (error) {
        console.error('Failed to create magazine:', error);
        throw new Error(error.message || 'Failed to create magazine');
    }
}

export async function updateMagazine(magazineId, data) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const validated = magazineSchema.parse({
            ...data,
            date:
                data?.date instanceof Date
                    ? data.date.toISOString()
                    : String(data?.date ?? ''),
        });
        await dbConnect();
        const updatedMagazine = await Magazine.findByIdAndUpdate(
            magazineId,
            {
                ...validated,
                date: new Date(validated.date),
            },
            { new: true }
        );
        if (!updatedMagazine) {
            throw new Error('Magazine not found');
        }
        return { message: 'Magazine updated successfully' };
    } catch (error) {
        console.error('Failed to update magazine:', error);
        throw new Error(error.message || 'Failed to update magazine');
    }
}

export async function deleteMagazine(magazineId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedMagazine = await Magazine.findByIdAndDelete(magazineId);
        if (!deletedMagazine) {
            throw new Error('Magazine not found');
        }
        return { message: 'Magazine deleted successfully' };
    } catch (error) {
        console.error('Failed to delete magazine:', error);
        throw new Error(error.message || 'Failed to delete magazine');
    }
}

export async function getMagazinesByCategory(category) {
    try {
        await dbConnect();
        const magazines = await Magazine.find({ category }).sort({ date: -1 }).lean();
        return JSON.parse(JSON.stringify(magazines));
    } catch (error) {
        console.error('Failed to fetch magazines by category:', error);
        throw new Error(error.message || 'Failed to fetch magazines by category');
    }
}
