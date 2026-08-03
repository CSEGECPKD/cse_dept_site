'use server';

import dbConnect from '@/lib/db';
import Certificate from '@/lib/models/Certificate';
import { isAuthenticated } from '@/lib/auth';

export async function createCertificate({ name, imageUrl }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newCertificate = new Certificate({ name, imageUrl });
        await newCertificate.save();
        return {
            message: 'Certificate created successfully',
        };
    } catch (error) {
        console.error('Failed to create certificate:', error);
        throw new Error('Failed to create certificate');
    }
}

export async function getCertificates() {
    try {
        await dbConnect();
        const certificates = await Certificate.find({});
        return JSON.parse(JSON.stringify(certificates));
    } catch (error) {
        console.error('Failed to fetch certificates:', error);
        throw new Error('Failed to fetch certificates');
    }
}

export async function deleteCertificate(certificateId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedCertificate =
            await Certificate.findByIdAndDelete(certificateId);
        if (!deletedCertificate) {
            throw new Error('Certificate not found');
        }
        return { message: 'Certificate deleted successfully' };
    } catch (error) {
        console.error('Failed to delete certificate:', error);
        throw new Error('Failed to delete certificate');
    }
}
