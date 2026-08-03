import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const variantMap = {
    default: 'default',
    secondary: 'secondary',
    destructive: 'destructive',
    outline: 'outline',
};

export default function StatusBadge({
    variant = 'default',
    children,
    className,
}) {
    return (
        <Badge
            variant={variantMap[variant] || 'default'}
            className={cn('font-medium', className)}
        >
            {children}
        </Badge>
    );
}
