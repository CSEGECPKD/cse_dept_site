'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createStudent } from '@/actions/student.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const studentFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    course: z.string().min(1, { message: 'Course is required' }),
    batch: z.string().regex(/^\d{4}-\d{4}$/, {
        message: 'Invalid batch format',
    }),
});

const StudentForm = ({ courses = [], refreshStudents }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(studentFormSchema),
        defaultValues: {
            course: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => createStudent(data),
        onSuccess: () => {
            reset({ course: '' });
            toast({
                variant: 'success',
                title: 'Student added',
                description: 'Student added successfully.',
            });
            refreshStudents?.();
            router.refresh();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add student',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="name"
                label="Name"
                type="text"
                placeholder="eg. John Doe"
                required
                error={errors?.name}
                {...register('name')}
            />

            <div className="space-y-1.5">
                <label htmlFor="course" className="text-sm font-medium">
                    Course
                    <span className="ml-0.5 text-destructive">*</span>
                </label>
                <Controller
                    name="course"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger id="course" className="h-10 w-full">
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem
                                        key={course._id}
                                        value={course._id}
                                    >
                                        {course.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors?.course && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.course.message}
                    </p>
                )}
            </div>

            <FormField
                id="batch"
                label="Batch"
                type="text"
                placeholder="eg. 2020-2024"
                required
                error={errors?.batch}
                {...register('batch')}
            />

            <Button
                type="submit"
                disabled={isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending ? 'Saving…' : 'Add Student'}
            </Button>
        </form>
    );
};

export default StudentForm;
