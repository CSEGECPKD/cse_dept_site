import React from 'react';
import DeptInfo from '../../../components/DeptInfo';
import DeptLogo from '../../../components/DeptLogo';
import History from '../../../components/History';
import CourseOfferedSection from '@/components/CourseOfferedSection';
import Contact from '@/components/Contact';

export const metadata = {
    title: 'About Us',
    description:
        'Learn about the Computer Science and Engineering Department at GEC Palakkad, our history, faculty, vision, mission, and academic environment.',
};

export default function About() {
    return (
        <div className="space-y-16 md:space-y-24">
            <DeptInfo isAboutPage={true} />
            <DeptLogo />
            <CourseOfferedSection />
            <History />
            <Contact />
        </div>
    );
}
