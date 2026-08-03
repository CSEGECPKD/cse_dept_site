'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createSyllabus } from '@/actions/syllabus.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const syllabusFormSchema = z.object({
    course: z.string().min(1, { message: 'Course is required' }),
    yearOfScheme: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
            message: 'Year of Scheme must be an integer',
        })
        .refine((val) => val.length === 4, {
            message: 'Year of Scheme must be 4 digits year',
        }),
    pdfUrl: z.string().min(1, { message: 'PDF URL is required' }),
});

const SyllabusForm = ({ refreshSyllabi }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(syllabusFormSchema),
        defaultValues: {
            pdfUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createSyllabus(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Syllabus added',
                description: 'Syllabus added successfully.',
            });
            refreshSyllabi?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add syllabus',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const pdfUrl = watch('pdfUrl');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
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
                    id="yearOfScheme"
                    label="Year of Scheme"
                    type="text"
                    placeholder="eg. 2020"
                    required
                    error={errors?.yearOfScheme}
                    {...register('yearOfScheme')}
                />
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
                {mutation.isPending ? 'Saving…' : 'Add Syllabus'}
            </Button>
        </form>
    );
};

export default SyllabusForm;
