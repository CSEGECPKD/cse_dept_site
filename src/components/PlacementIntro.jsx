'use client';

import React from 'react';
import Image from 'next/image';
import ColoredSection from './ColoredSection';

const PlacementIntro = () => {
    return (
        <ColoredSection color="BLACK">
            <div className="bg-white container mx-auto py-32 md:py-32 px-4 h-full md:min-h-[70vh]">
                <div className="w-full h-auto mb-8 md:mb-12">
                    <h1 className="text-black w-auto h-auto text-3xl md:text-4xl lg:text-5xl font-semibold font-bebasneue">
                        . TRAINING & PLACEMENT
                    </h1>
                </div>
                <div className="grid md:grid-cols-[330px_auto] grid-cols-1 gap-8 md:gap-[70px] w-full h-auto">
                    <div className="w-full flex justify-center md:justify-start">
                        <div className="w-full max-w-[250px] md:max-w-none">
                            <Image
                                src="/placement-cell-logo.svg"
                                alt="Training & Placement Cell Logo — GEC Palakkad"
                                width={250}
                                height={150}
                                className="w-full h-auto object-contain transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>
                    {/* message of hod */}
                    <div className="flex-auto w-full">
                        <p className="text-gray-600 text-[16px] sm:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[30px] lg:leading-[185%] transition duration-300 ease-in-out">
                            The Training and Placement Cell of the Computer Science and
                            Engineering Department at Government Engineering College,
                            Sreekrishnapuram, Palakkad, serves as the bridge between our
                            talented graduates and leading organisations across the country.
                            We work closely with industry partners to facilitate campus
                            recruitment drives, internships, and technical training programmes
                            that prepare our students for the demands of the modern workforce.
                            Our dedicated team coordinates with companies ranging from top
                            IT services firms to innovative startups, ensuring our students
                            have access to diverse career opportunities. We also organise
                            pre-placement workshops, mock interviews, and aptitude-training
                            sessions throughout the academic year to give every student the
                            best possible chance of securing a rewarding placement.
                        </p>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
};

export default PlacementIntro;
