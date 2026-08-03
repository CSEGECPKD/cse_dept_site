'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createAssociationMember } from '@/actions/associationmembers.action';
import { useToast } from '@/hooks/use-toast';

const associationMemberFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    year: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
            message: 'Year must be an integer',
        })
        .refine((val) => val.length === 4, {
            message: 'Year must be 4 digits',
        }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    mailId: z.string().email({ message: 'Invalid email' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const AssociationMemberForm = ({ refreshAssociationMembers }) => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(associationMemberFormSchema),
        defaultValues: {
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await createAssociationMember(data);
        },
        onSuccess: () => {
            refreshAssociationMembers?.();
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
                label="Year"
                type="text"
                placeholder="eg. 2023"
                name="year"
                {...register('year')}
                error={errors?.year}
            />
            <Input
                label="Designation"
                type="text"
                placeholder="eg. President"
                name="designation"
                {...register('designation')}
                error={errors?.designation}
            />
            <Input
                label="Email ID"
                type="email"
                placeholder="eg. john.doe@example.com"
                name="mailId"
                {...register('mailId')}
                error={errors?.mailId}
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

export default AssociationMemberForm;
