'use server';

import dbConnect from '@/lib/db';
import AssociationMember from '@/lib/models/AssociationMember';
import { isAuthenticated } from '@/lib/auth';
import { ALL_ASSOCIATION_MEMBERS } from '@/data/association';

export async function createAssociationMember({
    name,
    year,
    designation,
    mailId,
    imageUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newMember = new AssociationMember({
            name,
            year,
            designation,
            mailId,
            imageUrl,
        });
        await newMember.save();
        return {
            message: 'Association member created successfully',
        };
    } catch (error) {
        console.error('Failed to create association member:', error);
        throw new Error(error.message || 'Failed to create association member');
    }
}

export async function getAssociationMembers() {
    try {
        const conn = await dbConnect();
        if (conn) {
            const members = await AssociationMember.find({}).lean();
            if (members && members.length > 0) {
                return JSON.parse(JSON.stringify(members));
            }
        }
        return ALL_ASSOCIATION_MEMBERS;
    } catch (error) {
        console.error(
            'Failed to fetch association members from db, using fallback:',
            error
        );
        return ALL_ASSOCIATION_MEMBERS;
    }
}

export async function updateAssociationMember(
    memberId,
    { name, year, designation, mailId, imageUrl }
) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const updatedMember = await AssociationMember.findByIdAndUpdate(
            memberId,
            { name, year, designation, mailId, imageUrl },
            { new: true }
        );
        if (!updatedMember) {
            throw new Error('Association member not found');
        }
        return { message: 'Association member updated successfully' };
    } catch (error) {
        console.error('Failed to update association member:', error);
        throw new Error(error.message || 'Failed to update association member');
    }
}

export async function deleteAssociationMember(memberId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedMember =
            await AssociationMember.findByIdAndDelete(memberId);
        if (!deletedMember) {
            throw new Error('Association member not found');
        }
        return { message: 'Association member deleted successfully' };
    } catch (error) {
        console.error('Failed to delete association member:', error);
        throw new Error(error.message || 'Failed to delete association member');
    }
}
