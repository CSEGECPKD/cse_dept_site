'use server';

import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';
import { isAuthenticated } from '@/lib/auth';
import { eventSchema } from '@/lib/validations';

export async function createEvent(data) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        const validated = eventSchema.parse(data);
        await dbConnect();
        const newEvent = new Event(validated);
        await newEvent.save();
        return {
            message: 'Event created successfully',
        };
    } catch (error) {
        console.error('Failed to create event:', error);
        throw new Error(error.message || 'Failed to create event');
    }
}

export async function getEvents() {
    try {
        await dbConnect();
        const events = await Event.find({}).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw new Error(error.message || 'Failed to fetch events');
    }
}

export async function getEventById(id) {
    try {
        await dbConnect();
        const event = await Event.findById(id).lean();
        if (!event) throw new Error('Event not found');
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.error('Failed to fetch event:', error);
        throw new Error(error.message || 'Failed to fetch event');
    }
}

export async function deleteEvent(eventId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            throw new Error('Event not found');
        }
        return { message: 'Event deleted successfully' };
    } catch (error) {
        console.error('Failed to delete event:', error);
        throw new Error(error.message || 'Failed to delete event');
    }
}
