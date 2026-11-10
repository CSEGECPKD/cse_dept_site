'use client';

import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ColoredSection from './ColoredSection';

function HeroSection() {
    const videoRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        const video = videoRef.current;
        if (!video) return;

        video.defaultMuted = true;
        video.muted = true;
        video.play().catch(() => {});
    }, []);

    return (
        <ColoredSection color="WHITE">
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background video */}
                <video
                    ref={videoRef}
                    id="backgroundVideo"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/media/frontVid.mp4" type="video/mp4" />
                    <source src="/frontVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Text content */}
                <div
                    className="flex gap-2 items-start absolute bottom-0 left-0 w-full p-6 sm:p-8 lg:p-12 text-white z-10"
                    data-aos="fade-right"
                >
                    <div className="lg:w-3 lg:h-3 w-2 h-2 mt-2 sm:mt-3 bg-white shrink-0" />
                    <div>
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-4xl leading-tight">
                            COMPUTER SCIENCE AND ENGINEERING
                        </h1>
                        <p className="font-semibold text-xs sm:text-sm lg:text-[18px] mt-1 opacity-90">
                            GOVERNMENT ENGINEERING COLLEGE, SREEKRISHNAPURAM,
                            PALAKKAD
                        </p>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
}

export default HeroSection;
