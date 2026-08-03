'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createGallery } from '@/actions/gallery.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const galleryFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    image: z.string().min(1, { message: 'Image is required' }),
    imgDescription: z
        .string()
        .min(1, { message: 'Image Description is required' }),
});

const GalleryForm = ({ refreshGalleries }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(galleryFormSchema),
        defaultValues: {
            image: '',
            imgDescription: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createGallery(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Gallery item added',
                description: 'Gallery item added successfully.',
            });
            refreshGalleries?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add gallery item',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const imageUrl = watch('image');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="name"
                label="Name"
                type="text"
                placeholder="eg. Gallery Name"
                required
                error={errors?.name}
                {...register('name')}
            />

            <div className="space-y-2">
                <p className="text-sm font-medium">Image</p>
                <UploadCard
                    value={imageUrl}
                    onChange={(url) => setValue('image', url)}
                    label="Image"
                />
                {errors?.image && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.image.message}
                    </p>
                )}
            </div>

            <FormField
                id="imgDescription"
                label="Image Description"
                type="text"
                placeholder="eg. Description of the gallery"
                required
                error={errors?.imgDescription}
                {...register('imgDescription')}
            />

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {mutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? 'Saving…' : 'Add Gallery Item'}
            </Button>
        </form>
    );
};

export default GalleryForm;
