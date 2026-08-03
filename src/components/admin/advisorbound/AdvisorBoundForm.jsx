'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createAdvisoryBoardMember } from '@/actions/advisoryboard.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const advisorBoundFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    position: z.string().min(1, { message: 'Position is required' }),
    imageUrl: z.string().min(1, { message: 'Image is required' }),
});

const AdvisorBoundForm = ({ refreshAdvisors }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(advisorBoundFormSchema),
        defaultValues: {
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createAdvisoryBoardMember(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Advisor added',
                description: 'Advisor added successfully.',
            });
            refreshAdvisors?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add advisor',
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
                    id="designation"
                    label="Designation"
                    type="text"
                    placeholder="eg. Professor"
                    required
                    error={errors?.designation}
                    {...register('designation')}
                />
                <FormField
                    id="position"
                    label="Position"
                    type="text"
                    placeholder="eg. Advisory Board Member"
                    className="sm:col-span-2"
                    required
                    error={errors?.position}
                    {...register('position')}
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
                {mutation.isPending ? 'Saving…' : 'Add Advisor'}
            </Button>
        </form>
    );
};

export default AdvisorBoundForm;
