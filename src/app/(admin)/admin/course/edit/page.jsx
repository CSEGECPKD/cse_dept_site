'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getCourses } from '@/actions/course.action';
import CourseForm from '@/components/admin/course/CourseForm';
import CourseList from '@/components/admin/course/CourseList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditCoursePage = () => {
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
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Course"
                        description="Create a new record."
                    >
                        <CourseForm refreshCourses={fetchCourses} />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Existing Courses"
                        description="Manage existing records."
                    >
                        <CourseList
                            courseList={courseList}
                            loading={loading}
                            refresh={fetchCourses}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditCoursePage;
