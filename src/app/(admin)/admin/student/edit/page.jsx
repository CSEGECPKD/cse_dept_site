import { getCourses } from '@/actions/course.action';
import { getStudents } from '@/actions/student.action';
import StudentForm from '@/components/admin/student/StudentForm';
// import StudentList from "@/components/admin/student/StudentList";
import React from 'react';

const EditAccreditionPage = async () => {
    const students = await getStudents();
    const courses = await getCourses();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <StudentForm courses={courses} />
            </div>
            <div className="py-20 px-10">
                {/* <StudentList studentList={students} /> */}
            </div>
        </div>
    );
};

export default EditAccreditionPage;
