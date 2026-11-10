'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DeptConstants } from '@/constants/DeptConstants';
import { FaAngleRight, FaArrowRightLong } from 'react-icons/fa6';
import { motion, useScroll, useTransform } from 'framer-motion';
import ColoredSection from './ColoredSection';

const DeptInfo = ({ isAboutPage = false }) => {
    const containerRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateMedia = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        updateMedia();
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    // Scroll-driven animation when on homepage:
    // Starts as soon as section enters viewport bottom ('start end')
    // and settles smoothly as it reaches viewport center ('center center')
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'center center'],
    });

    // Pinned zoom & position transforms
    const titleScale = useTransform(scrollYProgress, [0, 0.9], [1.35, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.9], [-40, 0]);
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.75], [0.35, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0.15, 0.8], [0.4, 1]);
    const imageScale = useTransform(scrollYProgress, [0.15, 0.8], [0.92, 1]);

    if (isAboutPage) {
        return (
            <ColoredSection color="BLACK">
                <section
                    className="bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-28 lg:pt-36 pb-12 lg:pb-16 flex flex-col justify-center"
                    id="dept"
                >
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                            <div className="lg:col-span-6 xl:col-span-6">
                                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.15] text-gray-900 tracking-tight">
                                    The Department of Computer <br className="hidden sm:inline" />
                                    Science and Engineering
                                </h1>
                                <div className="w-16 h-[3px] bg-black mt-6 sm:mt-8 rounded-full"></div>
                            </div>
                            <div className="lg:col-span-6 xl:col-span-6">
                                <p className="text-gray-600 sm:text-xl md:text-2xl text-lg leading-relaxed font-normal">
                                    {DeptConstants.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </ColoredSection>
        );
    }

    return (
        <ColoredSection color="BLACK">
            <div
                ref={containerRef}
                className="bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 lg:py-24"
                id="dept"
            >
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] lg:grid-cols-[1fr_440px] gap-8 lg:gap-12 items-center">
                        {/* Left Column: Heading, Description & Action */}
                        <div className="w-full">
                            <motion.h2
                                style={
                                    isDesktop
                                        ? {
                                              scale: titleScale,
                                              y: titleY,
                                              originX: 0,
                                              originY: 0,
                                          }
                                        : {}
                                }
                                className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-[44px] xl:text-[48px] leading-[1.18] text-gray-900 tracking-tight"
                            >
                                The Department of Computer <br className="hidden sm:inline" />
                                Science and Engineering
                            </motion.h2>

                            <motion.div
                                style={isDesktop ? { opacity: contentOpacity } : {}}
                                className="pt-5 sm:pt-6"
                            >
                                <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                                    {DeptConstants.desc}
                                </p>

                                <div className="pt-6">
                                    <Link
                                        href="/aboutus"
                                        className="inline-flex items-center group bg-black hover:bg-white text-white hover:text-black border-2 border-black px-5 py-2.5 transition-all duration-300 ease-in-out transform hover:pr-7 font-medium text-sm sm:text-base"
                                    >
                                        Read More
                                        <span className="inline-flex items-center justify-center ml-2.5 w-auto h-auto transform group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                                            <FaAngleRight className="group-hover:hidden text-white transition-all duration-300 ease-in-out" />
                                            <FaArrowRightLong className="hidden group-hover:inline-flex text-black transition-all duration-300 ease-in-out" />
                                        </span>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Computer Illustration */}
                        <motion.div
                            style={
                                isDesktop
                                    ? {
                                          opacity: imageOpacity,
                                          scale: imageScale,
                                      }
                                    : {}
                            }
                            className="hidden md:flex justify-center items-center"
                        >
                            <div className="relative w-full max-w-[420px] flex justify-center items-center p-2">
                                <Image
                                    src="/icons/computer.png"
                                    width={480}
                                    height={320}
                                    alt="Computer Science and Engineering Illustration"
                                    className="w-full h-auto object-contain drop-shadow-sm select-none"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
};

export default DeptInfo;
