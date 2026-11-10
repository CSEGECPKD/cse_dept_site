'use client';

import React, { useState, useEffect } from 'react';

const PAGE_SIZE = 8;

function TopperCard({ topper }) {
    return (
        <div className="flex overflow-hidden flex-col w-60 bg-zinc-50">
            <div className="flex flex-col">
                <div className="flex overflow-hidden flex-col items-center w-60 bg-white aspect-square">
                    <img
                        loading="lazy"
                        src={topper.imageUrl || '/people/student-1.jpg'}
                        alt={topper.name}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col px-3 pt-3 w-60 max-w-full font-medium">
                    <div className="text-xl leading-6 text-black tracking-[2px] mb-1">
                        {topper.name}
                    </div>
                    <div className="flex flex-col self-start text-base tracking-widest leading-5 text-neutral-400">
                        {topper.batch && <div>{topper.batch} Batch</div>}
                        {topper.cgpa > 0 && <div>CGPA {topper.cgpa}</div>}
                        {topper.sem && <div>{topper.sem}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategorySection({ category, toppers }) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [animating, setAnimating] = useState(true);

    const visible = toppers.slice(0, visibleCount);

    const loadMore = () => {
        setAnimating(false);
        setTimeout(() => {
            setVisibleCount((n) => Math.min(n + PAGE_SIZE, toppers.length));
            setAnimating(true);
        }, 50);
    };

    return (
        <section className="flex overflow-hidden flex-col justify-center py-12 w-full bg-zinc-50 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col p-8 w-full bg-gray-200 max-md:px-5 max-md:max-w-full">
                <h2 className="self-start text-black font-bold font-bebasneue lg:text-5xl text-4xl text-center max-md:text-4xl">
                    . {category.toUpperCase()}
                </h2>
                <div className="flex flex-wrap gap-8 justify-between items-start mt-8 w-full max-md:max-w-full">
                    {visible.map((t, i) => (
                        <div
                            key={t._id || i}
                            className={`transition-all duration-500 ease-in-out ${animating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        >
                            <TopperCard topper={t} />
                        </div>
                    ))}
                </div>
                {visibleCount < toppers.length && (
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={loadMore}
                        className="gap-4 self-stretch px-2.5 py-3 mt-8 w-full text-base font-bold text-white bg-red-400 min-h-[35px] max-md:max-w-full text-center cursor-pointer"
                    >
                        LOAD MORE
                    </div>
                )}
            </div>
        </section>
    );
}

export default function MoreAchieversClient({ byCategory }) {
    const categories = Object.keys(byCategory);

    return (
        <div className="w-full h-full container py-10 flex-col justify-start items-start flex mx-auto">
            <section className="flex overflow-hidden flex-col justify-center py-14 w-full max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col w-full max-md:max-w-full">
                    <h1 className="self-end text-black font-bold font-bebasneue lg:text-5xl text-4xl">
                        . ACHIEVERS
                    </h1>
                    <p className="flex-1 shrink mt-8 w-full text-xl leading-10 text-neutral-400 max-md:max-w-full">
                        A showcase of excellence — our students who have
                        distinguished themselves as top performers, researchers,
                        and industry leaders.
                    </p>
                </div>
            </section>

            {categories.length === 0 ? (
                <p className="text-gray-400 text-center py-10 w-full">
                    No achievers to display yet.
                </p>
            ) : (
                categories.map((cat) => (
                    <CategorySection
                        key={cat}
                        category={cat}
                        toppers={byCategory[cat]}
                    />
                ))
            )}
        </div>
    );
}

