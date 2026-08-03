'use server';

import dbConnect from '../lib/db';
import Poster from '../lib/models/Poster';
import { isAuthenticated } from '../lib/auth';

export async function getPosters() {
    try {
        await dbConnect();
        const posters = await Poster.find({});
        return JSON.parse(JSON.stringify(posters));
    } catch (error) {
        console.error('Failed to fetch posters:', error);
        throw new Error('Failed to fetch posters');
    }
}

export async function createPoster({ name, imageUrl, description }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newPoster = new Poster({ name, imageUrl, description });
        await newPoster.save();
        return {
            message: 'Poster created successfully',
        };
    } catch (error) {
        console.error('Failed to create poster:', error);
        throw new Error('Failed to create poster');
    }
}

export async function deletePoster(posterId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedPoster = await Poster.findByIdAndDelete(posterId);
        if (!deletedPoster) {
            throw new Error('Poster not found');
        }
        return { message: 'Poster deleted successfully' };
    } catch (error) {
        console.error('Failed to delete poster:', error);
        throw new Error('Failed to delete poster');
    }
}
