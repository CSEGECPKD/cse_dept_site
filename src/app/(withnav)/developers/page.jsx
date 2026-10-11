'use client';
import ColoredSection from '@/components/ColoredSection';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { ImLinkedin2 } from 'react-icons/im';
import { BsTwitterX } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa6';
import { FaBehance } from 'react-icons/fa';

const iconMap = {
    ImLinkedin2: ImLinkedin2,
    BsTwitterX: BsTwitterX,
    FaGithub: FaGithub,
    FaBehance: FaBehance,
};

const data = [
    {
        img: '/ali.jpeg',
        name: 'Muhammad Ali',
        position: 'UI-UX Designer',
        socialmedia1: 'https://www.linkedin.com/in/muhammadalima',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://behance.com/muhammadalima',
        socialmediaimg2: 'FaBehance',
        socialmedia3: 'https://github.com/muhammadalima',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/hashiq.jpg',
        name: 'Muhammad Hashiq',
        position: 'Full-Stack Developer',
        socialmedia1: 'https://www.linkedin.com/in/muhammad-hashiq',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/muhammad-hashiq',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/muhammad-hashiq',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/jerald.jpeg',
        name: 'Jerald Joyson',
        position: 'Full-Stack Developer',
        socialmedia1: 'https://www.linkedin.com/in/jerald-joyson',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/jerald-joyson',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/jerald-joyson',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/bimal.jpeg',
        name: 'Bimal Devasia',
        position: 'Full-Stack Developer',
        socialmedia1: 'https://www.linkedin.com/in/bimal-devasia',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/bimal-devasia',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/bimal-devasia',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/nishan.jpeg',
        name: 'Mohammad Nishan',
        position: 'Full-Stack Developer',
        socialmedia1: 'https://www.linkedin.com/in/mohammad-nishan',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/mohammad-nishan',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/mohammad-nishan',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/viswa.jpg',
        name: 'Viswajith VP',
        position: 'Full-Stack Developer',
        socialmedia1: 'https://www.linkedin.com/in/viswajith-vp',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/viswajith-vp',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/viswajith-vp',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/amal.jpg',
        name: 'Amal Joseph',
        position: 'ML Developer',
        // Fixed: was incorrectly pointing to bimal-devasia's links
        socialmedia1: 'https://www.linkedin.com/in/amal-joseph',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/amal-joseph',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/amal-joseph',
        socialmediaimg3: 'FaGithub',
    },
    {
        img: '/rohini.jpg',
        name: 'Rohini Kanth',
        position: 'ML Developer',
        // Fixed: was incorrectly pointing to mohammad-nishan's links
        socialmedia1: 'https://www.linkedin.com/in/rohini-kanth',
        socialmediaimg1: 'ImLinkedin2',
        socialmedia2: 'https://twitter.com/rohini-kanth',
        socialmediaimg2: 'BsTwitterX',
        socialmedia3: 'https://github.com/rohini-kanth',
        socialmediaimg3: 'FaGithub',
    },
];

function DeveloperCard({ item }) {
    return (
        <div
            className="inline-block min-w-[250px] md:min-w-[350px] transition-all duration-300 ease-in-out transform hover:-translate-y-10 relative group"
        >
            <Image
                src={item.img}
                alt={`${item.name} — ${item.position}`}
                width={400}
                height={540}
                className="rounded-[48px] w-auto h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
            />
            <div className="mt-4">
                <h2 className="text-2xl md:text-3xl font-semibold">{item.name}</h2>
                <div className="flex gap-2 mt-1">
                    <div className="relative mt-1 w-4 h-4 bg-[#d9d9d9] rounded-lg" />
                    <p className="text-sm md:text-base font-mono">{item.position}</p>
                </div>
                <div className="flex space-x-4 mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pb-4">
                    <a href={item.socialmedia1} target="_blank" rel="noopener noreferrer">
                        {React.createElement(iconMap[item.socialmediaimg1], {
                            className: 'w-6 h-6 text-white hover:text-blue-500',
                        })}
                    </a>
                    <a href={item.socialmedia2} target="_blank" rel="noopener noreferrer">
                        {React.createElement(iconMap[item.socialmediaimg2], {
                            className: 'w-6 h-6 text-white hover:text-blue-400',
                        })}
                    </a>
                    <a href={item.socialmedia3} target="_blank" rel="noopener noreferrer">
                        {React.createElement(iconMap[item.socialmediaimg3], {
                            className: 'w-6 h-6 text-white hover:text-blue-400',
                        })}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Developers() {
    const isPaused = useRef(false);
    const requestRef = useRef(null);
    const xPercent = useRef(0);
    const direction = useRef(-1);
    const trackRef = useRef(null);

    useEffect(() => {
        const animate = () => {
            if (!isPaused.current && trackRef.current) {
                if (xPercent.current <= -50) {
                    xPercent.current = 0;
                }
                xPercent.current += 0.02 * direction.current;
                trackRef.current.style.transform = `translateX(${xPercent.current}%)`;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handleMouseEnter = () => { isPaused.current = true; };
    const handleMouseLeave = () => { isPaused.current = false; };

    // Duplicate the data array once so the marquee loops seamlessly
    const marqueeData = [...data, ...data];

    return (
        <ColoredSection>
            <div
                id="teams"
                className="bg-[#0a0a0a] min-h-screen text-white px-8 pt-24 pb-12 overflow-hidden"
            >
                <h1 className="px-8 text-[40px] md:text-[100px] font-semibold">
                    Meet our team
                </h1>

                <div
                    className="mt-6 w-full overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Single track with data duplicated — correct seamless marquee */}
                    <div
                        ref={trackRef}
                        className="flex space-x-8 will-change-transform"
                        style={{ width: 'max-content' }}
                    >
                        {marqueeData.map((item, index) => (
                            <DeveloperCard key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
}
