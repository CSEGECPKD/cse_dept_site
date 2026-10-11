import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WithNavLayout({ children }) {
    return (
        <>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
        </>
    );
}
