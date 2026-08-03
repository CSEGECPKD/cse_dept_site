'use server';

import dbConnect from '../lib/db';
import Facility from '../lib/models/Facility';
import { isAuthenticated } from '../lib/auth';

export async function getFacilities() {
    try {
        await dbConnect();
        const facilities = await Facility.find({});
        return JSON.parse(JSON.stringify(facilities));
    } catch (error) {
        console.error('Failed to fetch facilities:', error);
        throw new Error('Failed to fetch facilities');
    }
}

export async function createFacility({ name, description, pdfUrl }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newFacility = new Facility({ name, description, pdfUrl });
        await newFacility.save();
        return {
            message: 'Successfully created',
        };
    } catch (error) {
        console.error('Failed to create facility:', error);
        throw new Error('Failed to create facility');
    }
}

export async function deleteFacility(facilityId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedFacility = await Facility.findByIdAndDelete(facilityId);
        if (!deletedFacility) {
            throw new Error('Facility not found');
        }
        return { message: 'Facility deleted successfully' };
    } catch (error) {
        console.error('Failed to delete facility:', error);
        throw new Error('Failed to delete facility');
    }
}
