'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteEvent } from '@/actions/event.action';

const EventList = ({ eventList, loading, refresh }) => {
    if (loading) {
        return (
            <div className="space-y-1">
                <h2 className="text-right text-3xl font-medium">
                    UPCOMING EVENTS
                </h2>
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">UPCOMING EVENTS</h2>
            <ul className="space-y-1">
                {eventList.map((event) => (
                    <ListItem
                        key={event._id}
                        title={event.name}
                        onSuccess={refresh}
                        handleDelete={async () => {
                            await deleteEvent(event._id);
                        }}
                    />
                ))}
                {eventList.length === 0 && (
                    <p className="text-center text-red-500">No Events</p>
                )}
            </ul>
        </div>
    );
};

export default EventList;
