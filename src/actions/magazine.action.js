'use server';

import dbConnect from '../lib/db';
import Magazine from '../lib/models/Magazine';
import { isAuthenticated } from '../lib/auth';

export async function getMagazines() {
    try {
        await dbConnect();
        const magazines = await Magazine.find({}).sort({ date: -1 });
        return JSON.parse(JSON.stringify(magazines));
    } catch (error) {
        console.error('Failed to fetch magazines:', error);
        throw new Error('Failed to fetch magazines');
    }
}

export async function createMagazine({
    name,
    category,
    date,
    description,
    pdfUrl,
    frontPageUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newMagazine = new Magazine({
            name,
            category,
            date: new Date(date),
            description,
            pdfUrl,
            frontPageUrl,
        });
        await newMagazine.save();
        return {
            message: 'Success',
        };
    } catch (error) {
        console.error('Failed to create magazine:', error);
        throw new Error('Failed to create magazine');
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
        throw new Error('Failed to delete magazine');
    }
}

export async function getMagazinesByCategory(category) {
    try {
        await dbConnect();
        const magazines = await Magazine.find({ category }).sort({ date: -1 });
        return magazines;
    } catch (error) {
        console.error('Failed to fetch magazines by category:', error);
        throw new Error('Failed to fetch magazines by category');
    }
}
