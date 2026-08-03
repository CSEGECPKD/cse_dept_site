'use client';

import React from 'react';

import DataTable from '../ui/DataTable';
import RowActions from '../ui/RowActions';
import { deleteFacility } from '@/actions/facility.action';

const FacilityList = ({ facilityList, loading, refresh }) => {
    const columns = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: 'description',
            header: 'Description',
            cell: (item) => (
                <span className="text-muted-foreground">
                    {item.description}
                </span>
            ),
        },
        {
            key: 'actions',
            header: '',
            cellClassName: 'text-right',
            cell: (item) => (
                <RowActions
                    onDelete={async () => {
                        await deleteFacility(item._id);
                    }}
                    onSuccess={refresh}
                    deleteTitle="Delete facility?"
                    deleteDescription="This will permanently remove this facility from the site."
                />
            ),
        },
    ];

    return (
        <DataTable
            data={facilityList}
            loading={loading}
            columns={columns}
            searchKeys={['name', 'description']}
            searchPlaceholder="Search facilities…"
            emptyState={{
                title: 'No facilities yet',
                subtitle: 'Your facility list is empty.',
            }}
        />
    );
};

export default FacilityList;
