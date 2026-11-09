'use client';

import React, { useState } from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import EditDialog from '../ui/EditDialog';
import EventForm from './EventForm';
import StatusBadge from '../ui/StatusBadge';
import { deleteEvent } from '@/actions/event.action';

const EventList = ({ eventList, loading, refresh }) => {
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'date',
            header: 'Date',
            sortable: true,
            cell: (item) =>
                item.date
                    ? new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })
                    : '—',
        },
        {
            key: 'mode',
            header: 'Mode',
            cell: (item) => (
                <StatusBadge variant="secondary">{item.mode}</StatusBadge>
            ),
        },
        {
            key: 'details',
            header: 'Details',
            cell: (item) => (
                <span className="block max-w-xs truncate text-muted-foreground">
                    {item.details}
                </span>
            ),
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onEdit={() => setEditingItem(item)}
                    onDelete={async () => {
                        await deleteEvent(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete event?"
                    deleteDescription="This will permanently remove this event from the site."
                />
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={eventList}
                loading={loading}
                columns={columns}
                searchKeys={['name', 'mode']}
                searchPlaceholder="Search events…"
                emptyState={{
                    title: 'No events yet',
                    subtitle: 'Your event list is empty.',
                }}
            />
            <EditDialog
                open={Boolean(editingItem)}
                onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}
                title="Edit Event"
                description="Update event schedule, details, and registration links."
            >
                {editingItem && (
                    <EventForm
                        initialData={editingItem}
                        onSuccess={() => {
                            setEditingItem(null);
                            refresh();
                        }}
                        onCancel={() => setEditingItem(null)}
                    />
                )}
            </EditDialog>
        </>
    );
};

export default EventList;
