import { getStudentGroups } from '@/actions/studentgroup.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import FacultyForm from '@/components/admin/faculty/FacultyForm';
import StudentGroupForm from '@/components/admin/studentgroup/StudentGroupForm';
import StudentGroupList from '@/components/admin/studentgroup/StudentGroupList';
import React from 'react';

const EditAccreditionPage = async () => {
    const studentGroupList = await getStudentGroups();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <StudentGroupForm />
            </div>
            <div className="py-20 px-10">
                <StudentGroupList studentGroupList={studentGroupList} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
