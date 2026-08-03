import Input from '@/components/admin/Input';
import SubmitButton from '@/components/admin/SubmitButton';
import AccreditionForm from '@/components/admin/accredition/AccreditionForm';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import React from 'react';

const EditAccreditionPage = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <AccreditionForm />
            </div>
            <div className="py-20 px-10">
                <AccreditionList />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
