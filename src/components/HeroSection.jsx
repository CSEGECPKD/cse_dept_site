'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ColoredSection from './ColoredSection';

function HeroSection() {
    const videoRef = useRef(null);
    const notificationRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        const video = videoRef.current;
        if (!video) return;

        video.defaultMuted = true;
        video.muted = true;

        const handleLoaded = () => {
            setIsVideoLoaded(true);
        };

        if (video.readyState >= 2) {
            setIsVideoLoaded(true);
        } else {
            video.addEventListener('loadeddata', handleLoaded);
        }

        video.play().catch(() => {});

        return () => {
            video.removeEventListener('loadeddata', handleLoaded);
        };
    }, []);

    // Auto-open notification briefly on initial page load
    useEffect(() => {
        if (!hasAutoOpened) {
            setIsVisible(true);
            setHasAutoOpened(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [hasAutoOpened]);

    // Close notification on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleNotification = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <ColoredSection color="WHITE">
            <div className="relative h-screen w-full overflow-hidden">
                {/* Fallback placeholder background image */}
                <img
                    src="/ui/placeholder-image.jpeg"
                    alt="Background"
                    className={`w-full h-full object-cover absolute top-0 inset-0 z-0 transition-opacity duration-700 ${
                        isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                />

                {/* Background video */}
                <video
                    ref={videoRef}
                    id="backgroundVideo"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-cover absolute top-0 inset-0 z-0 transition-opacity duration-700 ${
                        isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <source src="/media/frontVid.mp4" type="video/mp4" />
                    <source src="/frontVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-[1]" />

                {/* Hero Title & Subtitle */}
                <div
                    className="flex gap-2.5 items-start absolute bottom-0 left-0 w-full p-6 sm:p-8 lg:p-12 text-white z-10"
                    data-aos="fade-right"
                >
                    <div className="lg:w-3 lg:h-3 w-2 h-2 mt-2 sm:mt-3 bg-white shrink-0" />
                    <div>
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-4xl leading-tight">
                            COMPUTER SCIENCE AND ENGINEERING
                        </h1>
                        <p className="font-bold text-xs sm:text-sm lg:text-[18px] mt-1 opacity-90 tracking-wide">
                            GOVERNMENT ENGINEERING COLLEGE, SREEKRISHNAPURAM,
                            PALAKKAD
                        </p>
                    </div>
                </div>

                {/* Notification Bell Icon */}
                <div
                    ref={notificationRef}
                    onClick={toggleNotification}
                    className="absolute bottom-44 sm:bottom-48 right-0 mt-48 box-content px-3 py-2 w-12 rounded-l-sm cursor-pointer z-20"
                    style={{
                        background: 'rgba(255, 255, 255, 0.10)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                    }}
                    data-aos="fade-left"
                >
                    <MdOutlineNotifications
                        style={{ color: '#FFFFFF' }}
                        size={26}
                    />
                </div>

                {/* Notification Popup Modal */}
                {isVisible && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'rgba(255, 255, 255, 0.10)',
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                        }}
                        className="text-white h-auto bottom-44 sm:bottom-48 absolute mt-48 right-5 box-content px-4 py-3 rounded-sm cursor-pointer z-20 max-w-xs font-montserrat shadow-lg border border-white/10"
                    >
                        <div className="flex gap-3 mb-2 items-center">
                            <h2 className="text-[20px] font-bebasneue tracking-wide">
                                NOTIFICATION
                            </h2>
                            <MdOutlineNotifications
                                style={{ color: '#FFFFFF' }}
                                size={22}
                            />
                        </div>
                        <div className="text-xs uppercase tracking-wider text-gray-200 leading-relaxed">
                            <p>SERIES EXAM STARTS IN DECEMBER</p>
                            <p>20 2025 FOR S3 AND S5 STUDENTS</p>
                        </div>
                    </div>
                )}
            </div>
        </ColoredSection>
    );
}

export default HeroSection;
