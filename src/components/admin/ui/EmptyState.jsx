import { cn } from '@/lib/utils';

export default function EmptyState({
    icon: Icon,
    title,
    subtitle,
    action,
    className,
}) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center px-6 py-16 text-center',
                className
            )}
        >
            {Icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="h-6 w-6" />
                </div>
            )}
            <h4 className="text-base font-semibold">{title}</h4>
            {subtitle && (
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    {subtitle}
                </p>
            )}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}
