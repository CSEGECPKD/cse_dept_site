'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getCourses } from '@/actions/course.action';
import StudentForm from '@/components/admin/student/StudentForm';

const EditAccreditionPage = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = useCallback(async () => {
        try {
            const courseList = await getCourses();
            setCourses(courseList);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

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
