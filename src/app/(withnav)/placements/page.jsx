import React from 'react';
import PlacementIntro from '@/components/PlacementIntro';
import PlacementRecruiters from '@/components/PlacementRecruiters';
import PlacementStatus from '@/components/PlacementStatus';
import PlacementGraph from '@/components/PlacementGraph';

export const metadata = {
    title: 'Placements',
    description:
        'Placement statistics, campus recruiters, placement cell details, and career opportunities for CSE students at Government Engineering College Palakkad.',
};

const Placement = () => {
    return (
        <>
            <PlacementIntro />
            <PlacementRecruiters />
            <PlacementStatus />
            <PlacementGraph />
        </>
    );
};

export default Placement;
