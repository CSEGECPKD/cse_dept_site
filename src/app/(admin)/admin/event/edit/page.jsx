'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getEvents } from '@/actions/event.action';
import EventForm from '@/components/admin/event/EventForm';
import EventList from '@/components/admin/event/EventList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditEventPage = () => {
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
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Event"
                        description="Create a new record."
                    >
                        <EventForm refreshEvents={fetchEvents} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Existing Events"
                        description="Manage existing records."
                    >
                        <EventList
                            eventList={eventList}
                            loading={loading}
                            refresh={fetchEvents}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditEventPage;
