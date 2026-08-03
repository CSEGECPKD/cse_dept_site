'use client';

import React from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import Input from '@/components/admin/Input';

const AccreditionForm = () => {
    return (
        <form className="space-y-8">
            <Input
                label="Title for the accrediction"
                type="text"
                placeholder="eg. NBA ACCREDITED UPTO 2025"
            />
            <div className="space-y-2">
                <h3 className="font-medium capitalize text-2xl">
                    Image(JPEG/JPG)
                </h3>
                <input type="file" />
            </div>
            <SubmitButton label="save" onClick={() => {}} />
        </form>
    );
};

export default AccreditionForm;
