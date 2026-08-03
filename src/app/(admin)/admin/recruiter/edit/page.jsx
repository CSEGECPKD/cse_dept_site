import { getRecruiters } from '@/actions/recruiter.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import RecruiterForm from '@/components/admin/recruiter/RecruiterForm';
import RecruiterList from '@/components/admin/recruiter/RecruiterList';
import React from 'react';

const EditAccreditionPage = async () => {
    const recruiter = await getRecruiters();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <RecruiterForm />
            </div>
            <div className="py-20 px-10">
                <RecruiterList recruiterList={recruiter} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
