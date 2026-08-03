import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton({ rows = 6, columns = 4 }) {
    return (
        <div className="w-full space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    {Array.from({ length: columns }).map((_, j) => (
                        <Skeleton
                            key={j}
                            className="h-8 flex-1"
                            style={
                                j === 0
                                    ? { flexBasis: '25%', flexGrow: 2 }
                                    : undefined
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function FormSkeleton({ fields = 4 }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: fields }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
            <Skeleton className="h-10 w-32" />
        </div>
    );
}

export function CardListSkeleton({ rows = 4 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
            ))}
        </div>
    );
}
