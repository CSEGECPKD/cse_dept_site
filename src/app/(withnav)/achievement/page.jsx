import ColoredSection from '../../../components/ColoredSection';
import AchieversClient from './acheivers/AchieversClient';
import AcheiversHorizontalScrollCarousel from './acheiversHorizontalScroll/page';
import ExpandableCards from './ExpandableCards';
import { getTopperList } from '@/actions/topper.action';

export const revalidate = 3600;

export const metadata = {
    title: 'Achievements',
    description:
        'Explore academic toppers, placements, and achievements of the Computer Science and Engineering Department at GEC Palakkad.',
};

export default async function Page() {
    const toppers = await getTopperList();

    const byCategory = toppers.reduce((acc, t) => {
        const cat = t.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(t);
        return acc;
    }, {});

    return (
        <ColoredSection className="pt-16" color="BLACK">
            <AchieversClient byCategory={byCategory} />
            <ExpandableCards title="SUCCESS STORIES" />
            <ExpandableCards title="ALUMNI STORIES" />
            <AcheiversHorizontalScrollCarousel />
        </ColoredSection>
    );
}
