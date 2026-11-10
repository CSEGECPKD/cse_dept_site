'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
    createCertificate,
    updateCertificate,
} from '@/actions/certificate.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const certificateFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const CertificateForm = ({
    initialData,
    onSuccess,
    onCancel,
    refreshCertificates,
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
        resolver: zodResolver(certificateFormSchema),
        defaultValues: {
            name: initialData?.name || '',
            imageUrl: initialData?.imageUrl || '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return updateCertificate(initialData._id, data);
            }
            return createCertificate(data);
        },
        onSuccess: () => {
            if (!isEditing) reset();
            toast({
                variant: 'success',
                title: isEditing ? 'Certificate updated' : 'Certificate added',
                description: isEditing
                    ? 'Certificate updated successfully.'
                    : 'Certificate added successfully.',
            });
            refreshCertificates?.();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: isEditing
                    ? 'Unable to update certificate'
                    : 'Unable to add certificate',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const imageUrl = watch('imageUrl');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="name"
                label="Name"
                type="text"
                placeholder="eg. Certificate of Excellence"
                required
                error={errors?.name}
                {...register('name')}
            />

            <div className="space-y-2">
                <p className="text-sm font-medium">Image</p>
                <UploadCard
                    value={imageUrl}
                    onChange={(url) => setValue('imageUrl', url)}
                    label="Image"
                />
                {errors?.imageUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.imageUrl.message}
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
                          : 'Add Certificate'}
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

export default CertificateForm;
