'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createStudentGroup } from '@/actions/studentgroup.action';
import { UploadButton } from '@/components/uploadthing';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const studentGroupFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    logoUrl: z.string().min(1, { message: 'Logo URL is required' }),
});

const StudentGroupForm = () => {
    const router = useRouter();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(studentGroupFormSchema),
        defaultValues: {
            logoUrl: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            await createStudentGroup(data);
        },
        onSuccess: () => {
            router.refresh();
            reset();
        },
        onError: (error) => {
            toast({
                description: `Cannot create ${error.message}`,
            });
        },
    });
    const onSubmit = (data) => {
        mutate(data);
    };

    console.log(errors);

    const logoUrl = watch('logoUrl');

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Name"
                type="text"
                placeholder="eg. Student Group Name"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Description"
                type="text"
                placeholder="eg. Student Group Description"
                name="description"
                {...register('description')}
                error={errors?.description}
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">Logo URL</h3>
                {logoUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log('Files: ', res);
                                setValue('logoUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.logoUrl && (
                            <p className="text-red-500">
                                {errors.logoUrl.message}
                            </p>
                        )}
                    </>
                ) : (
                    <img
                        className="w-[200px] border-2 border-black"
                        src={logoUrl}
                        alt=""
                    />
                )}
            </div>
            <SubmitButton disabled={isPending} label="save" type="submit" />
        </form>
    );
};

export default StudentGroupForm;
