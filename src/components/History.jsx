'use client';

import React from 'react';
import ColoredSection from './ColoredSection';

const milestones = [
    {
        year: '1999',
        title: 'Department Established',
        description:
            'Founded alongside the establishment of GEC Sreekrishnapuram, offering B.Tech in Computer Science and Engineering affiliated with the University of Calicut.',
    },
    {
        year: '2011',
        title: 'Postgraduate Programme',
        description:
            'Commenced M.Tech in Computational Linguistics, initiating specialized research in Natural Language Processing, Machine Learning, and Indic language technologies.',
    },
    {
        year: '2015',
        title: 'KTU Affiliation',
        description:
            'Affiliation transitioned to APJ Abdul Kalam Technological University (KTU), aligning with Kerala state-wide technical university standards.',
    },
    {
        year: '2016',
        title: 'Doctoral Research Centre',
        description:
            'Recognized as an approved research centre under KTU for mentoring scholars pursuing doctoral (Ph.D.) research in computing.',
    },
    {
        year: 'Present',
        title: 'NBA Accreditation',
        description:
            'Accredited by the National Board of Accreditation (NBA), operating modernized computing laboratories and active technical societies.',
    },
];

export default function History() {
    return (
        <ColoredSection color="BLACK">
            <section
                className="bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 py-12 lg:py-16 scroll-mt-24"
                id="history"
            >
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bebasneue tracking-wide text-black">
                            . HISTORY & MILESTONES
                        </h2>
                    </div>

                    {/* Narrative Overview */}
                    <div className="max-w-4xl space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed mb-12">
                        <p>
                            Established in 1999, the Department of Computer Science and Engineering at Government Engineering College Sreekrishnapuram has grown into a premier hub for computing education and engineering research in Kerala.
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                            From foundational computer science and systems architecture to artificial intelligence, distributed computing, and language technologies, our curriculum balances mathematical rigor with practical software and hardware engineering. Alumni of the department serve across major multinational technology enterprises, national research organizations, and academic institutions worldwide.
                        </p>
                    </div>

                    {/* Milestones Cards Grid - Clean, blended, using repository design tokens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {milestones.map((m, idx) => (
                            <div
                                key={idx}
                                className={`bg-[#F6F6F5] p-6 sm:p-7 flex flex-col justify-between group hover:bg-[#EAEAEA] transition-all duration-300 ${
                                    idx === 4 ? 'sm:max-lg:col-span-2 sm:max-lg:max-w-md sm:max-lg:mx-auto sm:max-lg:w-full' : ''
                                }`}
                            >
                                <div>
                                    <div className="text-3xl sm:text-4xl font-bold font-bebasneue text-black group-hover:text-[#DD846E] tracking-wider transition-colors duration-300">
                                        {m.year}
                                    </div>
                                    <div className="w-8 h-[2px] bg-[#DD846E] my-3" />
                                    <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-2">
                                        {m.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                        {m.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ColoredSection>
    );
}
