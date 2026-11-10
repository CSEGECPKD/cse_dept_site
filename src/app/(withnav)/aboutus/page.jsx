import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import DeptLogo from '@/components/DeptLogo';
import CourseOfferedSection from '@/components/CourseOfferedSection';
import History from '@/components/History';
import AboutAdvisoryBoard from '@/components/about/AboutAdvisoryBoard';
import Contact from '@/components/Contact';

export const metadata = {
    title: 'About Us | Department of Computer Science & Engineering',
    description:
        'Learn about the Computer Science and Engineering Department at Government Engineering College Palakkad (GECSKP): our history, vision, mission, academic programmes, Advisory Board, and contact details.',
};

export default function About() {
    return (
        <main className="bg-white">
            <AboutHero />
            <DeptLogo />
            <CourseOfferedSection />
            <History />
            <AboutAdvisoryBoard />
            <Contact />
        </main>
    );
}
