'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ColoredSection from '../../../components/ColoredSection';

function Home() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const video = document.getElementById('backgroundVideo');
        video.addEventListener('loadeddata', () => {
            setIsVideoLoaded(true);
        });

        return () => {
            video.removeEventListener('loadeddata', () => {
                setIsVideoLoaded(true);
            });
        };
    }, []);

    return (
        <ColoredSection color="WHITE">
            <div className="relative h-screen overflow-hidden">
                <div
                    className="flex gap-2 content absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white"
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
                    <img
                        src="/placeholder-image.jpeg" // Replace with your placeholder image path
                        alt="Background"
                        className={`w-full h-full object-cover absolute top-0 z-[-2] transition-opacity duration-500 ${
                            isVideoLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <video
                        id="backgroundVideo"
                        src="frontVid.mp4" // Replace with your video path
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className={`w-full h-full object-cover absolute top-0 z-[-1] transition-opacity duration-500 ${
                            isVideoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                </div>
            </div>
        </ColoredSection>
    );
}

export default Home;
