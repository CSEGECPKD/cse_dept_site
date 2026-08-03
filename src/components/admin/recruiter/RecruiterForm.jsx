'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createRecruiter } from '@/actions/recruiter.action';
import { useToast } from '@/hooks/use-toast';

const recruiterFormSchema = z.object({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    companyLogo: z.string().min(1, { message: 'Company logo is required' }),
});

const RecruiterForm = ({ refreshRecruiters }) => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(recruiterFormSchema),
        defaultValues: {
            companyLogo: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await createRecruiter(data);
        },
        onSuccess: () => {
            reset();
            refreshRecruiters?.();
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

    const companyLogo = watch('companyLogo');

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Company Name"
                type="text"
                placeholder="Enter company name"
                name="companyName"
                {...register('companyName')}
                error={errors?.companyName}
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">
                    Company Logo
                </h3>
                {companyLogo === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log('Files: ', res);
                                setValue('companyLogo', res[0].url);
                            }}
                            onUploadError={(error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.companyLogo && (
                            <p className="text-red-500">
                                {errors.companyLogo.message}
                            </p>
                        )}
                    </>
                ) : (
                    <img
                        className="w-[200px] border-2 border-black"
                        src={companyLogo}
                        alt="Company Logo"
                    />
                )}
            </div>
            <SubmitButton
                disabled={mutation.isPending}
                label="Save"
                type="submit"
            />
        </form>
    );
};

export default RecruiterForm;
