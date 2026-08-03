'use client';

import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DeleteDialog({
    title = 'Delete item?',
    description = 'This action cannot be undone.',
    confirmLabel = 'Delete',
    triggerClassName,
    onConfirm,
    onSuccess,
}) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const handleConfirm = async () => {
        try {
            setPending(true);
            await onConfirm?.();
            onSuccess?.();
        } finally {
            setPending(false);
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    aria-label="Delete"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={pending}
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}
                        className="gap-2"
                    >
                        {pending && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
