'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createSyllabus, updateSyllabus } from '@/actions/syllabus.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const syllabusFormSchema = z.object({
    course: z.string().min(1, { message: 'Course is required' }),
    yearOfScheme: z.string().min(1, { message: 'Year of Scheme is required' }).trim(),
    pdfUrl: z.string().min(1, { message: 'PDF URL is required' }),
});

const SyllabusForm = ({
    initialData,
    onSuccess,
    onCancel,
    refreshSyllabi,
}) => {
    const isEditing = Boolean(initialData?._id);
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
            course:
                typeof initialData?.course === 'object'
                    ? initialData.course?.name || ''
                    : initialData?.course || '',
            yearOfScheme: initialData?.yearOfScheme || '',
            pdfUrl: initialData?.pdfUrl || '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return updateSyllabus(initialData._id, data);
            }
            return createSyllabus(data);
        },
        onSuccess: () => {
            if (!isEditing) reset();
            toast({
                variant: 'success',
                title: isEditing ? 'Syllabus updated' : 'Syllabus added',
                description: isEditing
                    ? 'Syllabus updated successfully.'
                    : 'Syllabus added successfully.',
            });
            refreshSyllabi?.();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: isEditing
                    ? 'Unable to update syllabus'
                    : 'Unable to add syllabus',
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
                    endpoint="pdfUploader"
                    hint="PDF file. Max 16 MB."
                    isPdf={true}
                />
                {errors?.pdfUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.pdfUrl.message}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full gap-2 sm:w-auto"
                >
                    {mutation.isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {mutation.isPending
                        ? 'Saving…'
                        : isEditing
                          ? 'Save Changes'
                          : 'Add Syllabus'}
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default SyllabusForm;
