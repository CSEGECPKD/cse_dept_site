import { getSyllabi } from '@/actions/syllabus.action';
import SyllabusForm from '@/components/admin/syllabus/SyllabusForm';
import SyllabusList from '@/components/admin/syllabus/SyllabusList';
import React from 'react';

const EditAccreditionPage = async () => {
    const syllabi = await getSyllabi();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <SyllabusForm />
            </div>
            <div className="py-20 px-10">
                <SyllabusList syllabusList={syllabi} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
