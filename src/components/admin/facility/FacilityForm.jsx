'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createFacility, updateFacility } from '@/actions/facility.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const facilityFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF URL is required' }),
});

const FacilityForm = ({
    initialData,
    onSuccess,
    onCancel,
    refreshFacilities,
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
        resolver: zodResolver(facilityFormSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            pdfUrl: initialData?.pdfUrl || '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return updateFacility(initialData._id, data);
            }
            return createFacility(data);
        },
        onSuccess: () => {
            if (!isEditing) reset();
            toast({
                variant: 'success',
                title: isEditing ? 'Facility updated' : 'Facility added',
                description: isEditing
                    ? 'Facility updated successfully.'
                    : 'Facility added successfully.',
            });
            refreshFacilities?.();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: isEditing
                    ? 'Unable to update facility'
                    : 'Unable to add facility',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const pdfUrl = watch('pdfUrl');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. Computer Lab"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="description"
                    label="Description"
                    type="text"
                    placeholder="eg. Well equipped computer laboratory"
                    required
                    error={errors?.description}
                    {...register('description')}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">PDF</p>
                <UploadCard
                    value={pdfUrl}
                    onChange={(url) => setValue('pdfUrl', url)}
                    label="PDF"
                    fileName="Uploaded PDF"
                />
                {errors?.pdfUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.pdfUrl.message}
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
                          : 'Add Facility'}
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

export default FacilityForm;
