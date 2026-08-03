'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { updateFaculty } from '@/actions/faculty.action';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const facultyEditFormSchema = z.object({
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

const FacultyEditForm = ({ faculty }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(facultyEditFormSchema),
        defaultValues: useMemo(
            () => ({
                name: faculty.name,
                designation: faculty.designation,
                employeeType: faculty.employeeType,
                dateOfJoining: faculty.dateOfJoining
                    ? String(faculty.dateOfJoining).slice(0, 10)
                    : '',
                email: faculty.email,
                phone: faculty.phone,
                imageUrl: faculty.imageUrl || '',
            }),
            [faculty]
        ),
    });

    const mutation = useMutation({
        mutationFn: async (data) => updateFaculty(faculty._id, data),
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Changes saved',
                description: 'Employee updated successfully.',
            });
            router.push('/admin/faculty/edit');
            router.refresh();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to update employee',
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
                    placeholder="eg. Professor"
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
                {mutation.isPending ? 'Saving…' : 'Save Changes'}
            </Button>
        </form>
    );
};

export default FacultyEditForm;
