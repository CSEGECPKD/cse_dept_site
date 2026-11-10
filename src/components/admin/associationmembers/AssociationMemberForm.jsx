'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
    createAssociationMember,
    updateAssociationMember,
} from '@/actions/associationmembers.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const associationMemberFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    year: z
        .string()
        .min(1, { message: 'Academic Year is required' })
        .max(9, { message: 'Year must be at most 9 characters (e.g. 2025-26)' })
        .trim(),
    designation: z.string().min(1, { message: 'Designation is required' }),
    mailId: z.string().email({ message: 'Invalid email' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const AssociationMemberForm = ({
    initialData,
    onSuccess,
    onCancel,
    refreshAssociationMembers,
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
        resolver: zodResolver(associationMemberFormSchema),
        defaultValues: {
            name: initialData?.name || '',
            year: initialData?.year ? String(initialData.year) : '',
            designation: initialData?.designation || '',
            mailId: initialData?.mailId || '',
            imageUrl: initialData?.imageUrl || '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return updateAssociationMember(initialData._id, data);
            }
            return createAssociationMember(data);
        },
        onSuccess: () => {
            if (!isEditing) reset();
            toast({
                variant: 'success',
                title: isEditing ? 'Member updated' : 'Member added',
                description: isEditing
                    ? 'Member updated successfully.'
                    : 'Member added successfully.',
            });
            refreshAssociationMembers?.();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: isEditing
                    ? 'Unable to update member'
                    : 'Unable to add member',
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
                    label="Academic Year"
                    type="text"
                    placeholder="eg. 2025-26"
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
                          : 'Add Member'}
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

export default AssociationMemberForm;
