'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@/components/uploadthing';
import { useMutation } from '@tanstack/react-query';
import { createSubject } from '@/actions/subject.action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const subjectFormSchema = z.object({
    courseId: z.string().min(1, { message: 'Course ID is required' }),
    yearOfScheme: z.string().min(1, { message: 'Year of Scheme is required' }),
    semester: z.string().min(1, { message: 'Semester is required' }),
    subCode: z.string().min(1, { message: 'Subject Code is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pdfUrl: z.string().min(1, { message: 'PDF is required' }),
});

const SubjectForm = () => {
    const router = useRouter();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(subjectFormSchema),
        defaultValues: {
            pdfUrl: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await createSubject(data);
        },
        onSuccess: () => {
            reset();
            router.refresh();
        },
        onError: (error) => {
            toast({
                description: `Cannot create ${error.message}`,
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    console.log(errors);

    const pdfUrl = watch('pdfUrl');

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Course ID"
                type="text"
                placeholder="Enter Course ID"
                name="courseId"
                {...register('courseId')}
                error={errors?.courseId}
            />
            <Input
                label="Year of Scheme"
                type="text"
                placeholder="Enter Year of Scheme"
                name="yearOfScheme"
                {...register('yearOfScheme')}
                error={errors?.yearOfScheme}
            />
            <Input
                label="Semester"
                type="text"
                placeholder="Enter Semester"
                name="semester"
                {...register('semester')}
                error={errors?.semester}
            />
            <Input
                label="Subject Code"
                type="text"
                placeholder="Enter Subject Code"
                name="subCode"
                {...register('subCode')}
                error={errors?.subCode}
            />
            <Input
                label="Name"
                type="text"
                placeholder="Enter Subject Name"
                name="name"
                {...register('name')}
                error={errors?.name}
            />
            <Input
                label="Description"
                type="text"
                placeholder="Enter Subject Description"
                name="description"
                {...register('description')}
                error={errors?.description}
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">PDF File</h3>
                {pdfUrl === '' ? (
                    <>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log('Files: ', res);
                                setValue('pdfUrl', res[0].url);
                            }}
                            onUploadError={(error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {errors?.pdfUrl && (
                            <p className="text-red-500">
                                {errors.pdfUrl.message}
                            </p>
                        )}
                    </>
                ) : (
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        View Uploaded PDF
                    </a>
                )}
            </div>
            <SubmitButton
                disabled={mutation.isPending}
                label="Save Subject"
                type="submit"
            />
        </form>
    );
};

export default SubjectForm;
