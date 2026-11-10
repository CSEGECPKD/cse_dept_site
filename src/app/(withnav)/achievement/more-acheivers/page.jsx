import { getTopperList } from '@/actions/topper.action';
import MoreAchieversClient from './MoreAchieversClient';
import ColoredSection from '@/components/ColoredSection';

export const revalidate = 3600;

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
            <MoreAchieversClient byCategory={byCategory} />
        </ColoredSection>
    );
}
