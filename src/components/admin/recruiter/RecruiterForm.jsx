'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
    createRecruiter,
    updateRecruiter,
} from '@/actions/recruiter.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const recruiterFormSchema = z.object({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    companyLogo: z.string().min(1, { message: 'Company logo is required' }),
});

const RecruiterForm = ({
    initialData,
    onSuccess,
    onCancel,
    refreshRecruiters,
}) => {
    const isEditing = Boolean(initialData?._id);
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
            companyName: initialData?.companyName || '',
            companyLogo: initialData?.companyLogo || '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return updateRecruiter(initialData._id, data);
            }
            return createRecruiter(data);
        },
        onSuccess: () => {
            if (!isEditing) reset();
            toast({
                variant: 'success',
                title: isEditing ? 'Recruiter updated' : 'Recruiter added',
                description: isEditing
                    ? 'Recruiter updated successfully.'
                    : 'Recruiter added successfully.',
            });
            refreshRecruiters?.();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: isEditing
                    ? 'Unable to update recruiter'
                    : 'Unable to add recruiter',
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

            <div className="flex items-center gap-2">
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full gap-2 sm:w-auto"
                >
                    {mutation.isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {mutation.isPending
                        ? 'Saving…'
                        : isEditing
                          ? 'Save Changes'
                          : 'Add Recruiter'}
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default RecruiterForm;
