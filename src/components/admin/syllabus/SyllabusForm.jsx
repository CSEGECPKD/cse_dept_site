'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createSyllabus } from '@/actions/syllabus.action';
import { useToast } from '@/hooks/use-toast';

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
    const toast = useToast();
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
        mutationFn: async (data) => {
            await createSyllabus(data);
        },
        onSuccess: () => {
            refreshSyllabi?.();
            reset();
        },
        onError: (error) => {
            toast({
                description: `Cannot create ${error.message}`,
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    console.log(errors);

    const pdfUrl = watch('pdfUrl');

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Course"
                type="text"
                placeholder="eg. Computer Science"
                name="course"
                {...register('course')}
                error={errors?.course}
            />
            <Input
                label="Year of Scheme"
                type="text"
                placeholder="eg. 2020"
                name="yearOfScheme"
                {...register('yearOfScheme')}
                error={errors?.yearOfScheme}
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">PDF URL</h3>
                {pdfUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log('Files: ', res);
                                setValue('pdfUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.pdfUrl && (
                            <p className="text-red-500">
                                {errors.pdfUrl.message}
                            </p>
                        )}
                    </>
                ) : (
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View PDF
                    </a>
                )}
            </div>
            <SubmitButton
                disabled={mutation.isPending}
                label="save"
                type="submit"
            />
        </form>
    );
};

export default SyllabusForm;
