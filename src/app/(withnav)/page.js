import DeptInfo from '@/components/DeptInfo';
import DeptLogo from '@/components/DeptLogo';
import HodMessage from '@/components/HodMessage';
import HeroSection from '@/components/HeroSection';
import References from '@/components/References';

export const metadata = {
    title: 'Department of Computer Science & Engineering | GEC Palakkad',
    description:
        'Official website of the Computer Science and Engineering Department at Government Engineering College Palakkad (GECPKD). Explore academic programs, faculty, placements, and campus activities.',
};

export default function Home() {
    return (
        <div>
            <HeroSection />
            <DeptInfo />
            <DeptLogo />
            <HodMessage />
            <References />
        </div>
    );
}
