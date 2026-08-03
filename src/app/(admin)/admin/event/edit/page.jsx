'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getEvents } from '@/actions/event.action';
import EventForm from '@/components/admin/event/EventForm';
import EventList from '@/components/admin/event/EventList';

const EditAccreditionPage = () => {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            const events = await getEvents();
            setEventList(events);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <EventForm refreshEvents={fetchEvents} />
            </div>
            <div className="py-20 px-10">
                <EventList
                    eventList={eventList}
                    loading={loading}
                    refresh={fetchEvents}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
