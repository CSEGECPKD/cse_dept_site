import { getSubjects } from '@/actions/subject.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import SubjectForm from '@/components/admin/subject/SubjectForm';
import SubjectList from '@/components/admin/subject/SubjectList';
import React from 'react';

const EditAccreditionPage = async () => {
    const subject = await getSubjects();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <SubjectForm />
            </div>
            <div className="py-20 px-10">
                <SubjectList subjectList={subject} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
