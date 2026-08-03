'use client';
import { useState, useEffect } from 'react';
import HorizontalScroll from '../../../../components/horizontal-scroll';
import Link from 'next/link';

const images = ['/image1.jpeg', '/bg.png', '/bg.png', '/bg.png'];
const lastimag = ['/ImageScroll/image1.png', '/ImageScroll/image2.png'];
const AboutusHorizontalScrollCarousel = () => {
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
        <>
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
                                        } items-start my-6`}
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
                            <div className="relative h-full pl-[150px] flex bg-[#161616] flex-row flex-nowrap justify-start items-center">
                                {images.map((src, index) => (
                                    <div
                                        key={index}
                                        className="relative h-screen w-[1000px] mr-[40px] flex-shrink-0"
                                    >
                                        <div
                                            className={`absolute h-[680px] w-[950px] ${
                                                index % 2 === 0
                                                    ? 'top-5'
                                                    : 'bottom-5'
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
                                <div className="relative h-screen w-[1100px] bg-[#e9e9e8]">
                                    <div className="h-full w-full flex flex-row justify-end items-center mr-5">
                                        {lastimag.map((data, index) => (
                                            <Link key={index} href={'gallery'}>
                                                <div
                                                    className="group h-[400px] w-[400px] hover:border-3 hover:border-purple-500 rounded-md"
                                                    key={index}
                                                >
                                                    <img
                                                        className="h-auto w-[300px] grayscale group-hover:grayscale-0 group-hover:transition-all group-hover:duration-100 group-hover:ease-in-out"
                                                        src={data}
                                                        alt="random image"
                                                    />
                                                    <div></div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </HorizontalScroll>
                    )}
                </section>
            </main>
        </>
    );
};

export default AboutusHorizontalScrollCarousel;
