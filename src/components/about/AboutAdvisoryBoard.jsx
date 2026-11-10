'use client';

import React, { useState, useEffect } from 'react';
import ColoredSection from '../ColoredSection';
import { getAdvisoryBoardMembers } from '@/actions/advisoryboard.action';

const defaultAdvisors = [
    {
        name: 'Dr. K R Remesh Babu',
        designation: 'Principal, GEC Sreekrishnapuram',
        position: 'Chairman',
        imageUrl: '/people/anonymous.png',
    },
    {
        name: 'Prof. Helen K J',
        designation: 'Head of Department, CSE',
        position: 'Convener',
        imageUrl: '/people/hodImage.jpg',
    },
    {
        name: 'Dr. S. D. Madhu Kumar',
        designation: 'Professor, Dept. of CSE, NIT Calicut',
        position: 'Academic Expert',
        imageUrl: '/people/anonymous.png',
    },
    {
        name: 'Dr. Vinod P.',
        designation: 'Principal Engineer & Technology Consultant',
        position: 'Industry Expert',
        imageUrl: '/people/anonymous.png',
    },
    {
        name: 'Er. Anoop V.',
        designation: 'Lead Solutions Architect & Alumnus',
        position: 'Alumni Representative',
        imageUrl: '/people/anonymous.png',
    },
];

const AboutAdvisoryBoard = () => {
    const [displayMembers, setDisplayMembers] = useState(defaultAdvisors);

    useEffect(() => {
        let isMounted = true;
        getAdvisoryBoardMembers()
            .then((members) => {
                if (isMounted && Array.isArray(members) && members.length > 0) {
                    setDisplayMembers(members);
                }
            })
            .catch(() => {
                // Keep defaultAdvisors on fallback
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <ColoredSection color="BLACK">
            <section
                className="bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 py-12 lg:py-16 scroll-mt-24"
                id="advisory-board"
            >
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bebasneue tracking-wide text-black">
                            . DEPARTMENT ADVISORY BOARD
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-3xl">
                            Distinguished academic leaders, industry experts, and alumni guiding the department&apos;s strategic roadmap, academic standards, and research collaborations.
                        </p>
                    </div>

                    {/* Advisors Grid - using the signature Cardpeople design */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {displayMembers.map((member, idx) => (
                            <div
                                key={member._id || idx}
                                className="bg-[#F6F6F5] group/items hover:bg-[#DD846E] transition-all duration-500 cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-full h-[280px] sm:h-[300px] overflow-hidden bg-gray-200">
                                        <img
                                            src={member.imageUrl || '/people/anonymous.png'}
                                            alt={member.name}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/people/anonymous.png';
                                            }}
                                            className="w-full h-full object-cover object-top transition-all duration-500 group-hover/items:grayscale"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover/items:text-white transition-colors duration-300">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#696969] group-hover/items:text-white/90 transition-colors duration-300 mt-1">
                                            {member.designation}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    <div className="pt-2 border-t border-black/10 group-hover/items:border-white/20 transition-colors duration-300">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-black group-hover/items:text-white transition-colors duration-300 block">
                                            {member.position}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ColoredSection>
    );
};

export default AboutAdvisoryBoard;
