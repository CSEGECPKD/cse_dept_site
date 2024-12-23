'use server'

import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';
import { isAuthenticated } from '@/lib/auth';

export async function createEvent({ name, date, details, posters, regLinks }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newEvent = new Event({ name, date, details, posters, regLinks });
        await newEvent.save();
        return {
            message: "Event created successfully"
        };
    } catch (error) {
        console.error('Failed to create event:', error);
        throw new Error('Failed to create event');
    }
}

export async function getEvents() {
    try {
        await dbConnect();
        const events = await Event.find({});
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw new Error('Failed to fetch events');
    }
}NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_2he9cxm"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_8k14bo4"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="Zew9Cp60gbBzkcXy-"

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
        throw new Error('Failed to delete event');
    }
}
