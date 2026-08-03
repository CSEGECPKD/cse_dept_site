import { Inter, Montserrat, Bebas_Neue } from 'next/font/google';
import './global.css';
import LenisScroll from '@/components/LenisScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    title: 'CSE GECPKD Website',
    description:
        'Welcome to the official website of the Computer Science and Engineering Department of Government Engineering College, Palakkad.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} ${montserrat.variable} ${bebasNeue.variable}`}
            >
                <LenisScroll>
                    <Navbar />
                    {children}
                    <Footer />
                </LenisScroll>
            </body>
        </html>
    );
}
