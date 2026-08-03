'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createCertificate } from '@/actions/certificate.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const certificateFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const CertificateForm = ({ refreshCertificates }) => {
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
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createCertificate(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Certificate added',
                description: 'Certificate added successfully.',
            });
            refreshCertificates?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add certificate',
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

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {mutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? 'Saving…' : 'Add Certificate'}
            </Button>
        </form>
    );
};

export default CertificateForm;
