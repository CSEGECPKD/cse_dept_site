'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getCourses } from '@/actions/course.action';
import { getStudents } from '@/actions/student.action';
import StudentForm from '@/components/admin/student/StudentForm';
import StudentList from '@/components/admin/student/StudentLIst';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditStudentPage = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = useCallback(async () => {
        try {
            const courseList = await getCourses();
            setCourses(courseList);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    }, []);

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);
            const studentList = await getStudents();
            setStudents(studentList);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
        fetchStudents();
    }, [fetchCourses, fetchStudents]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Student"
                        description="Create a new record."
                    >
                        <StudentForm
                            courses={courses}
                            refreshStudents={fetchStudents}
                        />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Students"
                        description="Manage existing records."
                    >
                        <StudentList
                            studentList={students}
                            loading={loading}
                            refresh={fetchStudents}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditStudentPage;
