'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { UploadButton } from '@/components/uploadthing';
import { updateFaculty } from '@/actions/faculty.action';
import { toast } from '@/hooks/use-toast';

const facultyEditFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    employeeType: z
        .string()
        .min(1, { message: 'Employee Type is required' }),
    dateOfJoining: z
        .string()
        .min(1, { message: 'Date of Joining is required' }),
    email: z.string().email({ message: 'Invalid email' }),
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
                description: 'Employee updated successfully',
            });
            router.push('/admin/faculty/edit');
            router.refresh();
        },
        onError: (error) => {
            toast({
                description: `Cannot update: ${error.message}`,
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const imageUrl = watch('imageUrl');

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Full Name"
                type="text"
                placeholder="eg. John Doe"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Designation"
                type="text"
                placeholder="eg. Professor"
                name="designation"
                {...register('designation')}
                error={errors?.designation}
            />
            <Input
                label="Employee Type"
                type="text"
                placeholder="eg. Permanent / Adhoc"
                name="employeeType"
                {...register('employeeType')}
                error={errors?.employeeType}
            />
            <Input
                label="Date of Joining"
                type="date"
                name="dateOfJoining"
                {...register('dateOfJoining')}
                error={errors?.dateOfJoining}
            />
            <Input
                label="Email"
                type="email"
                placeholder="eg. john.doe@example.com"
                name="email"
                {...register('email')}
                error={errors?.email}
            />
            <Input
                label="Phone"
                type="text"
                placeholder="eg. 9876543210"
                name="phone"
                {...register('phone')}
                error={errors?.phone}
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">
                    Photo(JPEG/JPG)
                </h3>
                {imageUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setValue('imageUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.imageUrl && (
                            <p className="text-red-500">
                                {errors.imageUrl.message}
                            </p>
                        )}
                    </>
                ) : (
                    <img
                        className="w-[200px] border-2 border-black"
                        src={imageUrl}
                        alt=""
                    />
                )}
            </div>
            <SubmitButton
                disabled={mutation.isPending}
                label={mutation.isPending ? 'saving...' : 'save'}
                type="submit"
            />
        </form>
    );
};

export default FacultyEditForm;
