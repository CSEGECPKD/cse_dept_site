'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
    createStudentGroup,
    updateStudentGroup,
} from '@/actions/studentgroup.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const studentGroupFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    logoUrl: z.string().min(1, { message: 'Logo URL is required' }),
});

const StudentGroupForm = ({
    initialData,
    onSuccess,
    onCancel,
    refreshStudentGroups,
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
        resolver: zodResolver(studentGroupFormSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            logoUrl: initialData?.logoUrl || '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            if (isEditing) {
                return updateStudentGroup(initialData._id, data);
            }
            return createStudentGroup(data);
        },
        onSuccess: () => {
            if (!isEditing) reset();
            toast({
                variant: 'success',
                title: isEditing
                    ? 'Student group updated'
                    : 'Student group added',
                description: isEditing
                    ? 'Student group updated successfully.'
                    : 'Student group added successfully.',
            });
            refreshStudentGroups?.();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: isEditing
                    ? 'Unable to update student group'
                    : 'Unable to add student group',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    const logoUrl = watch('logoUrl');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="eg. Student Group Name"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="description"
                    label="Description"
                    type="text"
                    placeholder="eg. Student Group Description"
                    required
                    error={errors?.description}
                    {...register('description')}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Logo</p>
                <UploadCard
                    value={logoUrl}
                    onChange={(url) => setValue('logoUrl', url)}
                    label="Logo"
                />
                {errors?.logoUrl && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.logoUrl.message}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full gap-2 sm:w-auto"
                >
                    {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isPending
                        ? 'Saving…'
                        : isEditing
                          ? 'Save Changes'
                          : 'Add Student Group'}
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default StudentGroupForm;
