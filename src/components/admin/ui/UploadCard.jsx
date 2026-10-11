'use client';

import { RefreshCw, Trash2, UploadCloud, FileText } from 'lucide-react';

import { UploadDropzone } from '@/components/uploadthing';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function UploadCard({
    value,
    onChange,
    label = 'Image',
    hint = 'PNG, JPG. Max 4 MB.',
    fileName,
    endpoint = 'imageUploader',
    isPdf = false,
}) {
    const isPdfFile = isPdf || endpoint === 'pdfUploader' || (typeof value === 'string' && value.endsWith('.pdf'));

    const handleError = (error) => {
        toast({
            variant: 'destructive',
            title: `Unable to upload ${isPdfFile ? 'PDF' : 'image'}`,
            description: error?.message || 'Please try again.',
        });
    };

    if (value) {
        return (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="relative h-28 w-full max-w-[160px] overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                    {isPdfFile ? (
                        <div className="flex flex-col items-center justify-center gap-1 p-2 text-center text-muted-foreground">
                            <FileText className="h-8 w-8 text-primary" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">PDF</span>
                        </div>
                    ) : (
                        <img
                            src={value}
                            alt="Upload preview"
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate text-sm font-medium">
                        {fileName || (isPdfFile ? 'Uploaded PDF document' : 'Uploaded image')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Uploaded successfully.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {isPdfFile && (
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                asChild
                            >
                                <a href={value} target="_blank" rel="noopener noreferrer">
                                    View File
                                </a>
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onChange('')}
                        >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" />
                            Replace
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => onChange('')}
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'overflow-hidden rounded-lg border border-dashed bg-muted/30 transition-colors',
                'focus-within:border-primary'
            )}
        >
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res[0].url);
                    toast({
                        variant: 'success',
                        title: 'Upload complete',
                        description: `Your ${isPdfFile ? 'PDF' : 'image'} has been uploaded.`,
                    });
                }}
                onUploadError={handleError}
                className="ut-label:text-sm ut-label:font-medium ut-label:text-foreground ut-upload-icon:text-muted-foreground ut-button:bg-primary ut-button:text-primary-foreground ut-button:rounded-md ut-button:h-9 ut-button:px-4 ut-button:text-sm ut-button:font-medium ut-allowed-content:text-xs ut-allowed-content:text-muted-foreground"
            />
            <div className="flex items-center justify-center gap-2 border-t bg-background px-4 py-2">
                <UploadCloud className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                    {label} — {hint}
                </p>
            </div>
        </div>
    );
}
