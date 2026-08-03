'use client';
import React, { useState, useEffect } from 'react';
import studentsByCategory from '../../../../constants/contents';
import ColoredSection from '../../../../components/ColoredSection';

const MoreAchievers = ({ studentsByCategory }) => {
    const [visibleCards, setVisibleCards] = useState(4);
    const [animatingCards, setAnimatingCards] = useState([]);

    const handleLoadMore = () => {
        const totalCards = Object.keys(studentsByCategory).reduce(
            (sum, category) => sum + studentsByCategory[category].length,
            0
        );
        setVisibleCards(Math.min(visibleCards + 4, totalCards));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatingCards(Array(visibleCards).fill(true));
        }, 50);
        return () => clearTimeout(timer);
    }, [visibleCards]);
    return (
        <div className="w-full h-full container py-10 flex-col justify-start items-start flex mx-auto">
            <section className="flex overflow-hidden flex-col justify-center py-14 w-full max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col w-full max-md:max-w-full">
                    <h1 className="self-end text-black font-bold font-bebasneue lg:text-5xl text-4xl">
                        . ACHIEVERS
                    </h1>
                    <p className="flex-1 shrink mt-8 w-full text-xl leading-10 text-neutral-400 max-md:max-w-full">
                        Lorem ipsum dolor sit amet consectetur. Turpis consequat
                        nec et suscipit in urna rhoncus. Ut amet ut arcu in
                        ornare urna blandit. Sollicitudin sit est a odio. Eros
                        vulputate etiam euismod risus augue feugiat in quis. Est
                        molestie tristique feugiat faucibus tortor. Tortor nibh
                        nunc congue consequat. Eleifend mauris magna egestas
                        ultrices porta adipiscing turpis nunc praesent. Tortor
                        phasellus diam arcu a massa. Cras lacus nec tellus nulla
                        consectetur rhoncus tristique pellentesque montes.
                        Dictumst sit vel faucibus egestas. Vehicula consectetur
                        nisl in nulla venenatis.
                    </p>
                </div>
            </section>

            {/* Batch Wise Toppers Section */}
            {Object.keys(studentsByCategory).map((category) => {
                const students = studentsByCategory[category];
                const visibleStudents = students.slice(0, visibleCards);

                return (
                    <section
                        key={category}
                        className="flex overflow-hidden flex-col justify-center py-12 w-full bg-zinc-50 max-md:px-5 max-md:max-w-full"
                    >
                        <div className="flex flex-col p-8 w-full bg-gray-200 max-md:px-5 max-md:max-w-full">
                            <h2 className="self-start text-black font-bold font-bebasneue lg:text-5xl text-4xl text-center max-md:text-4xl">
                                . {category.toUpperCase()}
                            </h2>
                            <div className="flex flex-wrap gap-8 justify-between items-start mt-8 w-full max-md:max-w-full">
                                {visibleStudents.map((student, index) => (
                                    <div
                                        key={index}
                                        className={`flex overflow-hidden flex-col w-60 bg-zinc-50 transition-all duration-500 ease-in-out ${
                                            animatingCards[index]
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 -translate-y-10'
                                        }`}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex overflow-hidden flex-col items-center w-60 bg-white aspect-square">
                                                <img
                                                    loading="lazy"
                                                    src={student.image}
                                                    alt={student.name}
                                                    className="object-contain w-full aspect-[0.99]"
                                                />
                                            </div>
                                            <div className="flex flex-col px-3 pt-3 w-60 max-w-full font-medium">
                                                <div className="text-xl leading-6 text-black tracking-[2px] mb-1">
                                                    {student.name}
                                                </div>
                                                <div className="flex flex-col self-start text-base tracking-widest leading-5 text-neutral-400">
                                                    <div>
                                                        {student.batch} Batch
                                                    </div>
                                                    <div>
                                                        CGPA {student.cgpa}
                                                    </div>
                                                    <div>{student.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {visibleCards < students.length && (
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={handleLoadMore}
                                    className="gap-4 self-stretch px-2.5 py-3 mt-8 w-full text-base font-bold text-white bg-red-400 min-h-[35px] max-md:max-w-full text-center cursor-pointer"
                                >
                                    LOAD MORE
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default function Page() {
    return (
        <ColoredSection className="pt-16" color="BLACK">
            <MoreAchievers studentsByCategory={studentsByCategory} />
        </ColoredSection>
    );
}
