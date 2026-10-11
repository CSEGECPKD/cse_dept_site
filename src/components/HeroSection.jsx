'use client';

import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ColoredSection from './ColoredSection';

function HeroSection() {
    const videoRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, []);

    return (
        <ColoredSection color="WHITE">
            <div className="relative h-screen overflow-hidden">
                <div
                    className="flex gap-2 content absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white z-10"
                    data-aos="fade-right"
                >
                    <div className="lg:w-3 lg:h-3 w-2 h-2 mt-3 bg-white"></div>
                    <div>
                        <h1 className="lg:text-4xl font-bold text-[20px]">
                            COMPUTER SCIENCE AND ENGINEERING
                        </h1>
                        <p className="font-bold lg:text-[18px] text-[10px]">
                            GOVERNMENT ENGINEERING COLLEGE, SREEKRISHNAPURAM,
                            PALAKKAD
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden relative w-full h-screen">
                    <video
                        ref={videoRef}
                        id="backgroundVideo"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover absolute top-0 z-[-1]"
                    >
                        <source src="/frontVid.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </ColoredSection>
    );
}

export default HeroSection;
