import { cn } from '@/lib/utils';

export default function SectionCard({
    title,
    description,
    actions,
    className,
    bodyClassName,
    children,
}) {
    return (
        <section
            className={cn(
                'rounded-xl border bg-card text-card-foreground shadow-sm',
                className
            )}
        >
            {(title || actions) && (
                <div className="flex flex-col gap-2 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        {title && (
                            <h3 className="text-base font-semibold">{title}</h3>
                        )}
                        {description && (
                            <p className="mt-0.5 text-sm text-muted-foreground">
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
            )}
            <div className={cn('p-5', bodyClassName)}>{children}</div>
        </section>
    );
}
