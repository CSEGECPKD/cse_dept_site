'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createFacility } from '@/actions/facility.action';
import { useToast } from '@/hooks/use-toast';

const facilityFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF URL is required' }),
});

const FacilityForm = () => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(facilityFormSchema),
        defaultValues: {
            pdfUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await createFacility(data);
        },
        onSuccess: () => {
            alert('Success');
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
                label="Name"
                type="text"
                placeholder="eg. John Doe"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Description"
                type="text"
                placeholder="eg. Professor of Computer Science"
                name="description"
                {...register('description')}
                error={errors?.description}
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

export default FacilityForm;
