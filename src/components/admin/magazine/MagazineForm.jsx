'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createMagazine } from '@/actions/magazine.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const magazineFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    date: z.date({ message: 'Date is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF URL is required' }),
    frontPageUrl: z.string().min(1, { message: 'Front Page URL is required' }),
});

const MagazineForm = ({ refreshMagazines }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(magazineFormSchema),
        defaultValues: {
            pdfUrl: '',
            frontPageUrl: '',
            date: new Date(),
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createMagazine(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Magazine added',
                description: 'Magazine added successfully.',
            });
            refreshMagazines?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add magazine',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const pdfUrl = watch('pdfUrl');
    const frontPageUrl = watch('frontPageUrl');
    const date = watch('date') || new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. Magazine Name"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="category"
                    label="Category"
                    type="text"
                    placeholder="eg. Category"
                    required
                    error={errors?.category}
                    {...register('category')}
                />
            </div>

            <FormField
                id="date"
                label="Date"
                type="date"
                required
                value={dateString}
                onChange={(e) => setValue('date', e.target.valueAsDate)}
                error={errors?.date}
            />

            <FormField
                id="description"
                label="Description"
                type="text"
                placeholder="eg. Description"
                required
                error={errors?.description}
                {...register('description')}
            />

            <div className="space-y-2">
                <p className="text-sm font-medium">PDF</p>
                <UploadCard
                    value={pdfUrl}
                    onChange={(url) => setValue('pdfUrl', url)}
                    label="PDF"
                    fileName="Uploaded PDF"
                />
                {errors?.pdfUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.pdfUrl.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Front Page</p>
                <UploadCard
                    value={frontPageUrl}
                    onChange={(url) => setValue('frontPageUrl', url)}
                    label="Front Page"
                />
                {errors?.frontPageUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.frontPageUrl.message}
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
                {mutation.isPending ? 'Saving…' : 'Add Magazine'}
            </Button>
        </form>
    );
};

export default MagazineForm;
