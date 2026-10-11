import React from 'react';
import AcademicsIntro from '@/components/AcademicsIntro';
import AcademicsPrograms from '@/components/AcademicsPrograms';
import AcademicsLabs from '@/components/AcademicsLabs';

export const metadata = {
    title: 'Academics',
    description:
        'Explore undergraduate (B.Tech) and postgraduate (M.Tech) programs, course syllabi, curriculum, and advanced computing laboratories in CSE at GEC Palakkad.',
};

const Academics = () => {
    return (
        <div className="">
            <AcademicsIntro />
            <AcademicsPrograms />
            <AcademicsLabs />
        </div>
    );
};

export default Academics;
