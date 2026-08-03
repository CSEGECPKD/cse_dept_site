import React from 'react';
import { Save } from 'lucide-react';

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

const SavedList = () => {
    return (
        <div className="divide-y">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                    <Save className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.title}</span>
                </div>
            ))}
        </div>
    );
};

export default SavedList;
