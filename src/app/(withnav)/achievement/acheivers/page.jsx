import { getTopperList } from '@/actions/topper.action';
import AchieversClient from './AchieversClient';

export const revalidate = 3600; // ISR: re-fetch at most once per hour

export default async function Page() {
    const toppers = await getTopperList();

    // Group by category
    const byCategory = toppers.reduce((acc, t) => {
        const cat = t.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(t);
        return acc;
    }, {});

    return <AchieversClient byCategory={byCategory} />;
}
