'use client';

import React from 'react';
import Image from 'next/image';
import { DeptConstants } from '@/constants/DeptConstants';
import ColoredSection from '../ColoredSection';

const AboutHero = () => {
    return (
        <ColoredSection color="BLACK">
            <section
                className="bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-28 lg:pt-36 pb-12 lg:pb-16 scroll-mt-24"
                id="dept"
            >
                <div className="w-full max-w-7xl mx-auto">
                    <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-500 mb-4">
                        Government Engineering College Sreekrishnapuram, Palakkad
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                        {/* Left Column: Heading and Narrative */}
                        <div className="lg:col-span-7">
                            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.15] text-gray-900 tracking-tight">
                                The Department of Computer <br className="hidden sm:inline" />
                                Science and Engineering
                            </h1>
                            <div className="w-16 h-[3px] bg-black mt-6" />

                            <p className="mt-6 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
                                {DeptConstants.desc}
                            </p>

                            {/* Quick Metrics */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-black font-bebasneue tracking-wide">
                                        1999
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-0.5">
                                        Year Established
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-black font-bebasneue tracking-wide">
                                        NBA
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-0.5">
                                        Accredited B.Tech
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-black font-bebasneue tracking-wide">
                                        KTU
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-0.5">
                                        Affiliated
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-black font-bebasneue tracking-wide">
                                        UG, PG & Ph.D.
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-0.5">
                                        Programmes
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Seamless Graphic, no harsh border */}
                        <div className="lg:col-span-5 flex justify-center items-center">
                            <div className="relative w-full max-w-[420px] flex flex-col items-center justify-center p-2">
                                <Image
                                    src="/icons/computer.png"
                                    width={420}
                                    height={290}
                                    alt="Computer Science and Engineering"
                                    className="w-full h-auto object-contain select-none"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ColoredSection>
    );
};

export default AboutHero;
