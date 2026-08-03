'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createAssociationMember } from '@/actions/associationmembers.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const associationMemberFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    year: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
            message: 'Year must be an integer',
        })
        .refine((val) => val.length === 4, {
            message: 'Year must be 4 digits',
        }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    mailId: z.string().email({ message: 'Invalid email' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const AssociationMemberForm = ({ refreshAssociationMembers }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(associationMemberFormSchema),
        defaultValues: {
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createAssociationMember(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Member added',
                description: 'Member added successfully.',
            });
            refreshAssociationMembers?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add member',
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
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. John Doe"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="year"
                    label="Year"
                    type="text"
                    placeholder="eg. 2023"
                    required
                    error={errors?.year}
                    {...register('year')}
                />
                <FormField
                    id="designation"
                    label="Designation"
                    type="text"
                    placeholder="eg. President"
                    required
                    error={errors?.designation}
                    {...register('designation')}
                />
                <FormField
                    id="mailId"
                    label="Email ID"
                    type="email"
                    placeholder="eg. john.doe@example.com"
                    required
                    error={errors?.mailId}
                    {...register('mailId')}
                />
            </div>

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
                {mutation.isPending ? 'Saving…' : 'Add Member'}
            </Button>
        </form>
    );
};

export default AssociationMemberForm;
