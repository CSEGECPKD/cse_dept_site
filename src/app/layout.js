import { Inter, Montserrat, Bebas_Neue } from 'next/font/google';
import './globals.css';
import LenisScroll from '@/components/LenisScroll';
import QueryProvider from '@/components/QueryProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});
const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    variable: '--font-bebasneue',
    weight: ['400'],
});

export const metadata = {
    title: {
        default: 'CSE Department | GEC Palakkad',
        template: '%s | CSE GEC Palakkad',
    },
    description:
        'Official website of the Department of Computer Science and Engineering, Government Engineering College Palakkad. Explore academic programs, faculty, placements, research labs, events, and student achievements.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} ${montserrat.variable} ${bebasNeue.variable}`}
            >
                <QueryProvider>
                    <LenisScroll>{children}</LenisScroll>
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    );
}
