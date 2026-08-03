import React from 'react';
import ListItem from '../ListItem';

const data = [
    {
        title: 'NBA ACCREDITED (2025)',
        id: 'dkjdajjkdkajdk',
        remark: 'Data not Clear',
    },
    {
        title: 'NBA ACCREDITED (2024)',
        id: 'smfhsmfsm',
    },
    {
        title: 'NBA ACCREDITED (2024)',
        id: 'smfhsdssmfsm',
    },
    {
        title: 'NBA ACCREDITED (2024)',
        id: 'smfhsfwsmfsm',
    },
    {
        title: 'NBA ACCREDITED (2024)',
        id: 'smfwfwhsmfsm',
    },
];

const RequestStatusList = () => {
    return (
        <ul className="space-y-1">
            {data.map((item) => (
                <ListItem
                    type="request-status"
                    key={item.id}
                    title={item.title}
                    remark={item.remark}
                />
            ))}
        </ul>
    );
};

export default RequestStatusList;
