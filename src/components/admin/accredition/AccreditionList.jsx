import React from 'react';
import ListItem from '../ListItem';

const data = [
    {
        title: 'NBA ACCREDITED (2025)',
        id: 'dkjdajjkdkajdk',
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

const AccreditionList = () => {
    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">ALREADY ON SITE</h2>
            <ul className="space-y-1">
                {data.map((item) => (
                    <ListItem key={item.id} title={item.title} />
                ))}
            </ul>
        </div>
    );
};

export default AccreditionList;
