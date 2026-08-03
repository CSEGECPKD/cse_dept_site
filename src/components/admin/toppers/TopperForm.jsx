'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createTopper } from '@/actions/topper.action'; // Changed from createTopper to createAchiever
import { useToast } from '@/hooks/use-toast';

const achieverFormSchema = z.object({
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
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(achieverFormSchema), // Changed from topperFormSchema to achieverFormSchema
        defaultValues: {
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await createTopper(data); // Changed from createTopper to createAchiever
        },
        onSuccess: () => {
            reset();
            refreshToppers?.();
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

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Name"
                type="text"
                placeholder="eg. John Doe"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Batch"
                type="text"
                placeholder="eg. 2020-2024"
                name="batch"
                {...register('batch')}
                error={errors?.batch}
            />
            <Input
                label="Course"
                type="text"
                placeholder="eg. Computer Science"
                name="course"
                {...register('course')}
                error={errors?.course}
            />
            <Input
                label="Year"
                type="text"
                placeholder="eg. 2020"
                name="year"
                {...register('year')}
                error={errors?.year}
            />
            <Input
                label="Semester"
                type="text"
                placeholder="eg. 5"
                name="sem"
                {...register('sem')}
                error={errors?.sem}
            />
            <Input
                label="CGPA"
                type="text"
                placeholder="eg. 8.5"
                name="cgpa"
                {...register('cgpa')}
                error={errors?.cgpa}
            />
            <Input
                label="SGPA"
                type="text"
                placeholder="eg. 8.5"
                name="sgpa"
                {...register('sgpa')}
                error={errors?.sgpa}
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
                                // Do something with the response
                                console.log('Files: ', res);
                                setValue('imageUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                // Do something with the error.
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
            <SubmitButton label="save" type="submit" />
        </form>
    );
};

export default TopperForm;
