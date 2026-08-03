'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createCourse } from '@/actions/course.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const courseFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF is required' }),
});

const CourseForm = ({ refreshCourses }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            imageUrl: '',
            pdfUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createCourse(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Course added',
                description: 'Course added successfully.',
            });
            refreshCourses?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add course',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const imageUrl = watch('imageUrl');
    const pdfUrl = watch('pdfUrl');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. Introduction to Computer Science"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="description"
                    label="Description"
                    type="text"
                    placeholder="eg. A comprehensive introduction to computer science"
                    required
                    error={errors?.description}
                    {...register('description')}
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

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {mutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? 'Saving…' : 'Add Course'}
            </Button>
        </form>
    );
};

export default CourseForm;
