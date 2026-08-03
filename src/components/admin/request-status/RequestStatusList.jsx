import React from 'react';
import { Clock } from 'lucide-react';

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
        <div className="divide-y">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                    <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            {item.title}
                        </span>
                    </div>
                    {item.remark && (
                        <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                            {item.remark}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RequestStatusList;
