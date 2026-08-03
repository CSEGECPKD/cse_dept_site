'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createMagazine } from '@/actions/magazine.action';
import { useToast } from '@/hooks/use-toast';

const magazineFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    date: z.date({ message: 'Date is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF URL is required' }),
    frontPageUrl: z.string().min(1, { message: 'Front Page URL is required' }),
});

const MagazineForm = ({ refreshMagazines }) => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(magazineFormSchema),
        defaultValues: {
            pdfUrl: '',
            frontPageUrl: '',
            date: new Date(),
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await createMagazine(data);
        },
        onSuccess: () => {
            reset();
            refreshMagazines?.();
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
    const frontPageUrl = watch('frontPageUrl');
    const date = watch('date');
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    console.log(dateString);

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Name"
                type="text"
                placeholder="eg. Magazine Name"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Category"
                type="text"
                placeholder="eg. Category"
                name="category"
                {...register('category')}
                error={errors?.category}
            />
            <Input
                label="Date"
                type="date"
                name="date"
                value={dateString}
                onChange={(e) => setValue('date', e.target.valueAsDate)}
                error={errors?.date}
            />
            <Input
                label="Description"
                type="text"
                placeholder="eg. Description"
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
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            className="w-[200px] border-2 border-black"
                            src={pdfUrl}
                            alt="PDF"
                        />
                    </a>
                )}
            </div>
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">
                    Front Page URL
                </h3>
                {frontPageUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log('Files: ', res);
                                setValue('frontPageUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.frontPageUrl && (
                            <p className="text-red-500">
                                {errors.frontPageUrl.message}
                            </p>
                        )}
                    </>
                ) : (
                    <a
                        href={frontPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="w-[200px] border-2 border-black"
                            src={frontPageUrl}
                            alt="Front Page"
                        />
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

export default MagazineForm;
