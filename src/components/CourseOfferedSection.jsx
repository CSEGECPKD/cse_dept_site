'use client';

import React, { useRef } from 'react';
import useBoundingclientrect from '@rooks/use-boundingclientrect';
import Image from 'next/image';
import { AcadamicsDataForCard } from '@/constants/contents';
import ColoredSection from '../components/ColoredSection';

const CourseOfferedSection = () => {
    const ref = useRef(null);
    const boundingClientRect = useBoundingclientrect(ref);

    return (
        <ColoredSection color="WHITE" className="bg-black w-full">
            <div className="lg:sticky">
                <div className="brightness-50 hidden lg:sticky inset-0 lg:block">
                    <Image
                        src="/bg-acadamic.jpeg"
                        alt="department pic"
                        className="object-fill"
                        width={1920}
                        height={1920}
                    />
                </div>

                <div
                    className="px-6 sm:px-12 lg:px-20 py-16 md:py-24 text-white scroll-mt-24"
                    id="course"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] lg:gap-3 w-full max-w-[1400px] mx-auto relative z-1">
                        <div
                            className="space-y-4 lg:sticky lg:bottom-10 lg:top-40 z-1"
                            style={{
                                minHeight: 'auto',
                                height: 'fit-content',
                            }}
                        >
                            <h2 className="text-[24px] lg:text-5xl font-normal font-bebasneue leading-[28.8px] lg:leading-tight lg:text-left">
                                Course Offered
                            </h2>
                            <p className="font-montserrat text-[16px] sm:text-[22px] md:text-[24px]">
                                The Department of Computer Science and
                                Engineering offers rigorous undergraduate,
                                postgraduate, and doctoral programmes designed
                                to foster academic excellence, advance research,
                                and develop future leaders in computing.
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
                            <div className="space-y-8 lg:space-y-[113px]">
                                {AcadamicsDataForCard.map((item, i) => (
                                    <div
                                        ref={i === 6 ? ref : undefined}
                                        key={i}
                                        className="max-w-[390px] w-full  lg:pl-16"
                                    >
                                        <h2 className="font-medium font-montserrat text-[18px] lg:text-[20px] leading-[24.38px] mt-6">
                                            {item.title}
                                        </h2>
                                        <p className="font-normal font-montserrat text-[14px] lg:text-[16px] leading-[19.5px] mt-6">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
};

export default CourseOfferedSection;
