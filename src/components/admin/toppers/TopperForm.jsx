'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createTopper } from '@/actions/topper.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const topperFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    batch: z.string().min(1, { message: 'Batch is required' }),
    course: z.string().min(1, { message: 'Course is required' }),
    year: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
            message: 'Year must be an integer',
        })
        .refine((val) => val.length === 4, {
            message: 'Year must be 4 digits year',
        }),
    sem: z.string().refine((val) => /^\d+$/.test(val), {
        message: 'Semester must be an integer',
    }),
    cgpa: z.string().min(1, { message: 'CGPA is required' }),
    sgpa: z.string().min(1, { message: 'SGPA is required' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const TopperForm = ({ refreshToppers }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(topperFormSchema),
        defaultValues: {
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createTopper(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Topper added',
                description: 'Topper added successfully.',
            });
            refreshToppers?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add topper',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const imageUrl = watch('imageUrl');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. John Doe"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="batch"
                    label="Batch"
                    type="text"
                    placeholder="eg. 2020-2024"
                    required
                    error={errors?.batch}
                    {...register('batch')}
                />
                <FormField
                    id="course"
                    label="Course"
                    type="text"
                    placeholder="eg. Computer Science"
                    required
                    error={errors?.course}
                    {...register('course')}
                />
                <FormField
                    id="year"
                    label="Year"
                    type="text"
                    placeholder="eg. 2020"
                    required
                    error={errors?.year}
                    {...register('year')}
                />
                <FormField
                    id="sem"
                    label="Semester"
                    type="text"
                    placeholder="eg. 5"
                    required
                    error={errors?.sem}
                    {...register('sem')}
                />
                <FormField
                    id="cgpa"
                    label="CGPA"
                    type="text"
                    placeholder="eg. 8.5"
                    required
                    error={errors?.cgpa}
                    {...register('cgpa')}
                />
                <FormField
                    id="sgpa"
                    label="SGPA"
                    type="text"
                    placeholder="eg. 8.5"
                    required
                    error={errors?.sgpa}
                    {...register('sgpa')}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Image</p>
                <UploadCard
                    value={imageUrl}
                    onChange={(url) => setValue('imageUrl', url)}
                    label="Image"
                />
                {errors?.imageUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.imageUrl.message}
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
                {mutation.isPending ? 'Saving…' : 'Add Topper'}
            </Button>
        </form>
    );
};

export default TopperForm;
