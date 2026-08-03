'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createSubject } from '@/actions/subject.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const subjectFormSchema = z.object({
    courseId: z.string().min(1, { message: 'Course ID is required' }),
    yearOfScheme: z.string().min(1, { message: 'Year of Scheme is required' }),
    semester: z.string().min(1, { message: 'Semester is required' }),
    subCode: z.string().min(1, { message: 'Subject Code is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF is required' }),
});

const SubjectForm = ({ refreshSubjects }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(subjectFormSchema),
        defaultValues: {
            pdfUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createSubject(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Subject added',
                description: 'Subject added successfully.',
            });
            refreshSubjects?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add subject',
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
                    id="courseId"
                    label="Course ID"
                    type="text"
                    placeholder="Enter Course ID"
                    required
                    error={errors?.courseId}
                    {...register('courseId')}
                />
                <FormField
                    id="yearOfScheme"
                    label="Year of Scheme"
                    type="text"
                    placeholder="Enter Year of Scheme"
                    required
                    error={errors?.yearOfScheme}
                    {...register('yearOfScheme')}
                />
                <FormField
                    id="semester"
                    label="Semester"
                    type="text"
                    placeholder="Enter Semester"
                    required
                    error={errors?.semester}
                    {...register('semester')}
                />
                <FormField
                    id="subCode"
                    label="Subject Code"
                    type="text"
                    placeholder="Enter Subject Code"
                    required
                    error={errors?.subCode}
                    {...register('subCode')}
                />
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Enter Subject Name"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="description"
                    label="Description"
                    type="text"
                    placeholder="Enter Subject Description"
                    required
                    error={errors?.description}
                    {...register('description')}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">PDF File</p>
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
                {mutation.isPending ? 'Saving…' : 'Add Subject'}
            </Button>
        </form>
    );
};

export default SubjectForm;
