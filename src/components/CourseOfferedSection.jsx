'use client';

import React from 'react';
import Link from 'next/link';
import { FaAngleRight, FaArrowRightLong } from 'react-icons/fa6';
import ColoredSection from './ColoredSection';

const programmes = [
    {
        title: 'B.Tech in Computer Science and Engineering',
        level: 'Undergraduate (4 Years)',
        description:
            'Four-year comprehensive undergraduate programme providing robust foundations in algorithms, system software, networking, security, and artificial intelligence.',
        notes: [
            { label: 'Approved Intake', value: '66 + 6 Students (Regular + Lateral Entry)' },
            { label: 'Affiliation', value: 'APJ Abdul Kalam Technological University (KTU)' },
            { label: 'Accreditation', value: 'NBA Accredited' },
        ],
    },
    {
        title: 'M.Tech in Computational Linguistics',
        level: 'Postgraduate (2 Years)',
        description:
            'Specialized interdisciplinary postgraduate programme focusing on Natural Language Processing, machine learning, and Indic speech and language computing.',
        notes: [
            { label: 'Approved Intake', value: '18 Students' },
            { label: 'Affiliation', value: 'APJ Abdul Kalam Technological University (KTU)' },
            { label: 'Accreditation', value: 'AICTE Approved' },
        ],
    },
    {
        title: 'Ph.D. in Computer Science and Engineering',
        level: 'Doctoral Research',
        description:
            'Advanced doctoral research programme fostering novel contributions across artificial intelligence, cybersecurity, distributed networks, and computing theory.',
        notes: [
            { label: 'Research Centre', value: 'KTU Approved Research Centre' },
            { label: 'Modes of Study', value: 'Full-time / Part-time Research' },
            { label: 'Affiliation', value: 'APJ Abdul Kalam Technological University (KTU)' },
        ],
    },
];

const CourseOfferedSection = () => {
    return (
        <ColoredSection color="BLACK">
            <section
                className="bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 py-12 lg:py-16 scroll-mt-24"
                id="course"
            >
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bebasneue tracking-wide text-black">
                                . ACADEMIC PROGRAMMES
                            </h2>
                        </div>

                        <Link
                            href="/academics"
                            className="inline-flex items-center group bg-black hover:bg-white text-white hover:text-black border-2 border-black px-5 py-2.5 transition-all duration-300 ease-in-out font-medium text-sm self-start md:self-auto shrink-0"
                        >
                            View Full Curriculum
                            <span className="inline-flex items-center justify-center ml-2.5 transform group-hover:translate-x-2 transition-transform duration-300">
                                <FaAngleRight className="group-hover:hidden text-white" />
                                <FaArrowRightLong className="hidden group-hover:inline-flex text-black" />
                            </span>
                        </Link>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programmes.map((prog, idx) => (
                            <div
                                key={idx}
                                className={`bg-[#F6F6F5] p-6 sm:p-8 flex flex-col justify-between ${
                                    idx === 2 ? 'md:max-lg:col-span-2 md:max-lg:max-w-md md:max-lg:mx-auto md:max-lg:w-full' : ''
                                }`}
                            >
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xl sm:text-2xl leading-snug">
                                        {prog.title}
                                    </h3>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mt-1 mb-3">
                                        {prog.level}
                                    </p>

                                    {/* Short Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                        {prog.description}
                                    </p>

                                    {/* Important Notes */}
                                    <div className="space-y-3 pt-4 border-t border-black/10">
                                        {prog.notes.map((note, nIdx) => (
                                            <div
                                                key={nIdx}
                                                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"
                                            >
                                                <span className="text-xs sm:text-sm text-gray-500 font-medium shrink-0">
                                                    {note.label}:
                                                </span>
                                                <span className="text-sm sm:text-base font-semibold text-gray-900 sm:text-right">
                                                    {note.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-black/10">
                                    <Link
                                        href="/academics"
                                        className="text-xs sm:text-sm font-semibold text-black hover:underline inline-flex items-center gap-1.5"
                                    >
                                        Detailed Syllabus & Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ColoredSection>
    );
};

export default CourseOfferedSection;
