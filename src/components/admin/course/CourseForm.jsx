'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createFaculty } from '@/actions/faculty.action';
import { createCourse } from '@/actions/course.action';
import { useToast } from '@/hooks/use-toast';

const courseFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF is required' }),
});

const CourseForm = ({ refreshCourses }) => {
    const toast = useToast();
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
        mutationFn: async (data) => {
            await createCourse(data);
        },
        onSuccess: () => {
            refreshCourses?.();
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

    const imageUrl = watch('imageUrl');
    const pdfUrl = watch('pdfUrl');

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Name"
                type="text"
                placeholder="eg. Introduction to Computer Science"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Description"
                type="text"
                placeholder="eg. A comprehensive introduction to the fundamentals of computer science"
                name="description"
                {...register('description')}
                error={errors?.description}
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">
                    Image(JPEG/JPG)
                </h3>
                {imageUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log('Files: ', res);
                                setValue('imageUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.imageUrl && (
                            <p className="text-red-500">
                                {errors.imageUrl.message}
                            </p>
                        )}
                    </>
                ) : (
                    <img
                        className="w-[200px] border-2 border-black"
                        src={imageUrl}
                        alt=""
                    />
                )}
            </div>
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">PDF</h3>
                {pdfUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log('Files: ', res);
                                setValue('pdfUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
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
                    <p>PDF uploaded successfully</p>
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

export default CourseForm;
