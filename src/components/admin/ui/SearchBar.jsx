import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search…',
    className,
}) {
    return (
        <div className={className}>
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    className="h-9 w-full pl-9 pr-9 md:w-64"
                />
                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                        aria-label="Clear search"
                        onClick={() => onChange('')}
                    >
                        <X className="h-3.5 w-3.5" />
                    </Button>
                )}
            </div>
        </div>
    );
}
