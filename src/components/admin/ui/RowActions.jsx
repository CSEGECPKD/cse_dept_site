'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import DeleteDialog from './DeleteDialog';

export default function RowActions({
    editHref,
    onDelete,
    onSuccess,
    deleteTitle = 'Delete item?',
    deleteDescription = 'This action cannot be undone.',
}) {
    return (
        <div className="flex items-center justify-end gap-1">
            {editHref && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    aria-label="Edit"
                    asChild
                >
                    <Link href={editHref}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
            )}
            {onDelete && (
                <DeleteDialog
                    title={deleteTitle}
                    description={deleteDescription}
                    onConfirm={onDelete}
                    onSuccess={onSuccess}
                />
            )}
        </div>
    );
}
