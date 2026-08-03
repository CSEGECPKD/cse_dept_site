import { getFaculties } from '@/actions/faculty.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import FacultyForm from '@/components/admin/faculty/FacultyForm';
import FacultyList from '@/components/admin/faculty/FacultyList';
import React from 'react';

const EditAccreditionPage = async () => {
    const faculties = await getFaculties();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <FacultyForm />
            </div>
            <div className="py-20 px-10">
                <FacultyList facultyList={faculties} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
