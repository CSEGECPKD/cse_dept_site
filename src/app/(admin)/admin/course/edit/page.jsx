import { getCourses } from '@/actions/course.action';
import CourseForm from '@/components/admin/course/CourseForm';
import CourseList from '@/components/admin/course/CourseList';
import React from 'react';

const EditAccreditionPage = async () => {
    const courseList = await getCourses();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <CourseForm />
            </div>
            <div className="py-20 px-10">
                <CourseList courseList={courseList} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
