'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getCourses } from '@/actions/course.action';
import CourseForm from '@/components/admin/course/CourseForm';
import CourseList from '@/components/admin/course/CourseList';

const EditAccreditionPage = () => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            const courses = await getCourses();
            setCourseList(courses);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <CourseForm refreshCourses={fetchCourses} />
            </div>
            <div className="py-20 px-10">
                <CourseList
                    courseList={courseList}
                    loading={loading}
                    refresh={fetchCourses}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
