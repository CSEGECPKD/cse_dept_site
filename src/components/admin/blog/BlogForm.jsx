'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createBlog } from '@/actions/blog.action';
import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';
import UploadCard from '../ui/UploadCard';
import { toast } from '@/hooks/use-toast';

const blogFormSchema = z.object({
    name: z.string().min(1, { message: 'Blog name is required' }),
    authorName: z.string().min(1, { message: 'Author name is required' }),
    type: z.string().min(1, { message: 'Blog type is required' }),
    authorPosition: z
        .string()
        .min(1, { message: 'Author position is required' }),
    authorImage: z.string().min(1, { message: 'Author image is required' }),
    authorLinkedin: z.string().url({ message: 'Invalid LinkedIn URL' }),
});

const BlogForm = ({ refreshBlogs }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            authorImage: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => createBlog(data),
        onSuccess: () => {
            reset();
            toast({
                variant: 'success',
                title: 'Blog added',
                description: 'Blog added successfully.',
            });
            refreshBlogs?.();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Unable to add blog',
                description: error?.message || 'Please try again.',
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const authorImage = watch('authorImage');

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="name"
                    label="Blog Name"
                    type="text"
                    placeholder="eg. The Future of AI"
                    required
                    error={errors?.name}
                    {...register('name')}
                />
                <FormField
                    id="type"
                    label="Blog Type"
                    type="text"
                    placeholder="eg. Technology"
                    required
                    error={errors?.type}
                    {...register('type')}
                />
                <FormField
                    id="authorName"
                    label="Author Name"
                    type="text"
                    placeholder="eg. John Doe"
                    required
                    error={errors?.authorName}
                    {...register('authorName')}
                />
                <FormField
                    id="authorPosition"
                    label="Author Position"
                    type="text"
                    placeholder="eg. Senior Data Scientist"
                    required
                    error={errors?.authorPosition}
                    {...register('authorPosition')}
                />
                <FormField
                    id="authorLinkedin"
                    label="Author LinkedIn"
                    type="url"
                    placeholder="eg. https://www.linkedin.com/in/johndoe"
                    required
                    error={errors?.authorLinkedin}
                    {...register('authorLinkedin')}
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Author Image</p>
                <UploadCard
                    value={authorImage}
                    onChange={(url) => setValue('authorImage', url)}
                    label="Author Image"
                />
                {errors?.authorImage && (
                    <p className="text-xs font-medium text-destructive">
                        {errors.authorImage.message}
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
                {mutation.isPending ? 'Saving…' : 'Add Blog'}
            </Button>
        </form>
    );
};

export default BlogForm;
