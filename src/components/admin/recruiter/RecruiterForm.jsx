'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createRecruiter } from '@/actions/recruiter.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const recruiterFormSchema = z.object({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    companyLogo: z.string().min(1, { message: 'Company logo is required' }),
});

const RecruiterForm = ({ refreshRecruiters }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(recruiterFormSchema),
        defaultValues: {
            companyLogo: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createRecruiter(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Recruiter added',
                description: 'Recruiter added successfully.',
            });
            refreshRecruiters?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add recruiter',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const companyLogo = watch('companyLogo');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="companyName"
                label="Company Name"
                type="text"
                placeholder="Enter company name"
                required
                error={errors?.companyName}
                {...register('companyName')}
            />

            <div className="space-y-2">
                <p className="text-sm font-medium">Company Logo</p>
                <UploadCard
                    value={companyLogo}
                    onChange={(url) => setValue('companyLogo', url)}
                    label="Company Logo"
                />
                {errors?.companyLogo && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.companyLogo.message}
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
                {mutation.isPending ? 'Saving…' : 'Add Recruiter'}
            </Button>
        </form>
    );
};

export default RecruiterForm;
