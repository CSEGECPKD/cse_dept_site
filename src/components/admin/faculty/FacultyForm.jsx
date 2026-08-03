'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createFaculty } from '@/actions/faculty.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const facultyFormSchema = z.object({
    name: z.string().min(1, { message: 'Employee name is required' }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    employeeType: z.string().min(1, { message: 'Employee type is required' }),
    dateOfJoining: z
        .string()
        .min(1, { message: 'Date of joining is required' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    imageUrl: z.string(),
});

const FacultyForm = ({ refreshFaculties }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(facultyFormSchema),
        defaultValues: {
            imageUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createFaculty(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Employee added',
                description: 'Employee added successfully.',
            });
            refreshFaculties?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add employee',
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
                    label="Full Name"
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
                    placeholder="eg. Assistant Professor"
                    required
                    error={errors?.designation}
                    {...register('designation')}
                />
                <FormField
                    id="employeeType"
                    label="Employee Type"
                    type="text"
                    placeholder="eg. Teaching / Technical"
                    required
                    error={errors?.employeeType}
                    {...register('employeeType')}
                />
                <FormField
                    id="dateOfJoining"
                    label="Date of Joining"
                    type="date"
                    required
                    error={errors?.dateOfJoining}
                    {...register('dateOfJoining')}
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="eg. john.doe@example.com"
                    required
                    error={errors?.email}
                    {...register('email')}
                />
                <FormField
                    id="phone"
                    label="Phone"
                    type="tel"
                    placeholder="eg. 9876543210"
                    required
                    error={errors?.phone}
                    {...register('phone')}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Photo</p>
                <UploadCard
                    value={imageUrl}
                    onChange={(url) => setValue('imageUrl', url)}
                    label="Photo"
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
                {mutation.isPending ? 'Saving…' : 'Add Employee'}
            </Button>
        </form>
    );
};

export default FacultyForm;
