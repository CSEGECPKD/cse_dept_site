'use server';

import mongoose from 'mongoose';
import dbConnect from '../lib/db';
import Syllabus from '../lib/models/Syllabus';
import { isAuthenticated } from '../lib/auth';

export async function getSyllabi() {
    try {
        await dbConnect();
        const syllabi = await Syllabus.find({}).populate('course').lean();
        return JSON.parse(JSON.stringify(syllabi));
    } catch (error) {
        console.error('Failed to fetch syllabi:', error);
        throw new Error(error.message || 'Failed to fetch syllabi');
    }
}

export async function createSyllabus({
    course,
    sem,
    yearOfScheme,
    syllabusId,
    pdfUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();

        // Check if syllabus already exists
        const existingSyllabus = await Syllabus.findOne({ syllabusId });
        if (existingSyllabus) {
            throw new Error('Syllabus with this ID already exists');
        }

        const newSyllabus = new Syllabus({
            course,
            sem,
            yearOfScheme,
            syllabusId,
            pdfUrl,
        });
        await newSyllabus.save();
        return {
            message: 'Success',
        };
    } catch (error) {
        console.error('Failed to create syllabus:', error);
        throw new Error(error.message || 'Failed to create syllabus');
    }
}

export async function updateSyllabus(
    id,
    { course, sem, yearOfScheme, syllabusId, pdfUrl }
) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const query = mongoose.Types.ObjectId.isValid(id)
            ? { $or: [{ _id: id }, { syllabusId: id }] }
            : { syllabusId: id };
        const updatedSyllabus = await Syllabus.findOneAndUpdate(
            query,
            {
                course,
                sem,
                yearOfScheme,
                syllabusId: syllabusId || id,
                pdfUrl,
            },
            { new: true }
        );
        if (!updatedSyllabus) {
            throw new Error('Syllabus not found');
        }
        return { message: 'Syllabus updated successfully' };
    } catch (error) {
        console.error('Failed to update syllabus:', error);
        throw new Error(error.message || 'Failed to update syllabus');
    }
}

export async function deleteSyllabus(id) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const query = mongoose.Types.ObjectId.isValid(id)
            ? { $or: [{ _id: id }, { syllabusId: id }] }
            : { syllabusId: id };
        const deletedSyllabus = await Syllabus.findOneAndDelete(query);
        if (!deletedSyllabus) {
            throw new Error('Syllabus not found');
        }
        return { message: 'Syllabus deleted successfully' };
    } catch (error) {
        console.error('Failed to delete syllabus:', error);
        throw new Error(error.message || 'Failed to delete syllabus');
    }
}
