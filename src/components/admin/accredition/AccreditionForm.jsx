'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import FormField from '../ui/FormField';

const AccreditionForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = () => {
        // Static placeholder — no backend wiring available for accreditations.
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="title"
                label="Title for the accreditation"
                type="text"
                placeholder="eg. NBA ACCREDITED UPTO 2025"
                {...register('title')}
            />
            <div className="space-y-2">
                <p className="text-sm font-medium">Image</p>
                <input
                    type="file"
                    className="w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-accent"
                />
            </div>
            <Button type="submit" className="w-full gap-2 sm:w-auto">
                <Loader2 className="h-4 w-4" />
                Save
            </Button>
        </form>
    );
};

export default AccreditionForm;
