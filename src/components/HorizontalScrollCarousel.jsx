'use client';
import { useEffect, useState } from 'react';
import ColoredSection from './ColoredSection';
import HorizontalScroll from './horizontal-scroll';

const images = [
    '/ImageScroll/s82025.jpeg',
    '/ImageScroll/s72024.jpeg',
    '/ImageScroll/image5.jpeg',
    '/ImageScroll/image6.jpeg',
    '/ImageScroll/image1.png',
    '/ImageScroll/image2.png',
];

const HorizontalScrollCarousel = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile(); // Initial check
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return (
        <ColoredSection color="WHITE">
            <main className="bg-black">
                <section className="relative w-[100%] min-h-[100vh]">
                    {isMobile ? (
                        <div className="h-auto w-full">
                            <div className="flex flex-col w-full h-auto p-4">
                                {images.map((src, index) => (
                                    <div
                                        key={index}
                                        className={`flex w-full h-auto ${
                                            index % 2 === 0
                                                ? 'justify-start'
                                                : 'justify-end'
                                        } items-center my-6`}
                                    >
                                        <img
                                            src={src}
                                            alt={`sample image ${index + 1}`}
                                            className="w-[85%] h-auto object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <HorizontalScroll>
                            <div className="relative h-full pl-[150px] bg-black flex flex-row flex-nowrap justify-start items-center">
                                {images.map((src, index) => (
                                    <div
                                        key={index}
                                        className="relative h-[700px] w-[600px] mr-[75px] flex-shrink-0"
                                    >
                                        <div
                                            className={`absolute h-[650px] w-auto ${
                                                index % 2 === 0
                                                    ? 'top-0'
                                                    : 'bottom-0'
                                            } right-0`}
                                        >
                                            <img
                                                src={src}
                                                className="w-full h-full object-cover"
                                                alt={`random image ${index + 1}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </HorizontalScroll>
                    )}
                </section>
            </main>
        </ColoredSection>
    );
};

export default HorizontalScrollCarousel;
