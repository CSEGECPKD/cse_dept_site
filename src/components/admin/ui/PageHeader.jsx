import { cn } from '@/lib/utils';

export default function PageHeader({ title, description, actions, className }) {
    return (
        <div
            className={cn(
                'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
                className
            )}
        >
            <div className="min-w-0">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}
