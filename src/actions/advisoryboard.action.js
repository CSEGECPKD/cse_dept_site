'use server';

import dbConnect from '@/lib/db';
import AdvisoryBoard from '@/lib/models/AdvisoryBoard';
import { isAuthenticated } from '@/lib/auth';

export async function createAdvisoryBoardMember({
    name,
    designation,
    position,
    imageUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newMember = new AdvisoryBoard({
            name,
            designation,
            position,
            imageUrl,
        });
        await newMember.save();
        return {
            message: 'Advisory board member created successfully',
        };
    } catch (error) {
        console.error('Failed to create advisory board member:', error);
        throw new Error('Failed to create advisory board member');
    }
}

export async function getAdvisoryBoardMembers() {
    try {
        await dbConnect();
        const members = await AdvisoryBoard.find({});
        return JSON.parse(JSON.stringify(members));
    } catch (error) {
        console.error('Failed to fetch advisory board members:', error);
        throw new Error('Failed to fetch advisory board members');
    }
}

export async function deleteAdvisoryBoardMember(memberId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedMember = await AdvisoryBoard.findByIdAndDelete(memberId);
        if (!deletedMember) {
            throw new Error('Advisory board member not found');
        }
        return { message: 'Advisory board member deleted successfully' };
    } catch (error) {
        console.error('Failed to delete advisory board member:', error);
        throw new Error('Failed to delete advisory board member');
    }
}
