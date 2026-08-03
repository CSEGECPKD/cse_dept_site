import { cn } from '@/lib/utils';

export default function Toolbar({ className, children }) {
    return (
        <div
            className={cn(
                'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
                className
            )}
        >
            {children}
        </div>
    );
}
