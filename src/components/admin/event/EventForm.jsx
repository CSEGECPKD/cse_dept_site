'use client';

import React from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createEvent } from '@/actions/event.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const eventFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    date: z.date({ required_error: 'Date is required' }),
    details: z.string().min(1, { message: 'Details are required' }),
    mode: z.string().min(1, { message: 'Mode is required' }),
    posters: z
        .array(z.string())
        .min(1, { message: 'At least one poster is required' }),
    regLinks: z
        .array(z.string())
        .min(1, { message: 'At least one registration link is required' }),
});

const EventForm = ({ refreshEvents }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            posters: [],
            regLinks: [],
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createEvent(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Event added',
                description: 'Event added successfully.',
            });
            refreshEvents?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add event',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const posters = watch('posters');
    const regLinks = watch('regLinks');

    const addLink = () => setValue('regLinks', [...regLinks, '']);
    const updateLink = (index, value) => {
        const next = [...regLinks];
        next[index] = value;
        setValue('regLinks', next);
    };
    const removeLink = (index) => {
        setValue(
            'regLinks',
            regLinks.filter((_, i) => i !== index)
        );
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. Annual Tech Conference"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="date"
                    label="Date"
                    type="date"
                    required
                    error={errors?.date}
                    {...register('date', { valueAsDate: true })}
                />
                <FormField
                    id="details"
                    label="Details"
                    type="text"
                    placeholder="Enter event details..."
                    className="sm:col-span-2"
                    required
                    error={errors?.details}
                    {...register('details')}
                />
            </div>

            <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                    Mode
                    <span className="ml-0.5 text-destructive">*</span>
                </Label>
                <select
                    {...register('mode')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">Select mode</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                {errors?.mode && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.mode.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Posters</p>
                {posters.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {posters.map((poster, index) => (
                            <div
                                key={index}
                                className="relative h-28 w-28 overflow-hidden rounded-lg border bg-muted"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={poster}
                                    alt={`Poster ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    aria-label="Remove poster"
                                    onClick={() =>
                                        setValue(
                                            'posters',
                                            posters.filter(
                                                (_, i) => i !== index
                                            )
                                        )
                                    }
                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-destructive shadow-sm transition-colors hover:bg-background"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <UploadCard
                    value=""
                    onChange={(url) => setValue('posters', [...posters, url])}
                    label="Poster"
                />
                {errors?.posters && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.posters.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Registration Links</p>
                <div className="space-y-2">
                    {regLinks.map((link, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <Input
                                type="url"
                                value={link}
                                placeholder="eg. https://forms.gle/example"
                                onChange={(e) =>
                                    updateLink(index, e.target.value)
                                }
                                className="h-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
                                aria-label={`Remove link ${index + 1}`}
                                onClick={() => removeLink(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLink}
                >
                    <Plus className="h-4 w-4" />
                    Add Registration Link
                </Button>
                {errors?.regLinks && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.regLinks.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {mutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? 'Saving…' : 'Save Event'}
            </Button>
        </form>
    );
};

export default EventForm;
