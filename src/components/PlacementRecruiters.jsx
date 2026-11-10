'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getRecruiters } from '@/actions/recruiter.action';

const STATIC_LOGOS = [
    '/recruiters/cognizant.jpg',
    '/recruiters/tata.jpg',
    '/recruiters/ust.jpg',
    '/recruiters/qburst.jpg',
    '/recruiters/keltron.jpg',
    '/recruiters/experion.jpg',
    '/recruiters/LandT.jpg',
    '/recruiters/pennyflo.jpg',
    '/recruiters/xyvin.jpg',
    '/recruiters/zendalona.jpg',
];

const ScrollingRow = ({ direction, innerRef, images, animationDuration }) => (
    <div
        className="flex items-center whitespace-nowrap"
        ref={innerRef}
        style={{
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationName:
                direction === 'left' ? 'scrollLeft' : 'scrollRight',
        }}
    >
        {[...images, ...images].map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Recruiter ${index + 1}`}
                className="inline-block px-10 h-16 w-auto object-contain flex-none"
            />
        ))}
    </div>
);

const PlacementRecruiters = () => {
    const outerRef = useRef(null);
    const innerRef1 = useRef(null);
    const innerRef2 = useRef(null);
    const [animationDuration, setAnimationDuration] = useState(20);
    const [recruiterLogos, setRecruiterLogos] = useState([]);

    useEffect(() => {
        let mounted = true;
        getRecruiters()
            .then((res) => {
                if (mounted && Array.isArray(res) && res.length > 0) {
                    const valid = res.map((r) => r.companyLogo).filter(Boolean);
                    if (valid.length > 0) {
                        setRecruiterLogos(valid);
                    }
                }
            })
            .catch(() => {});
        return () => {
            mounted = false;
        };
    }, []);

    const activeList = recruiterLogos.length > 0 ? recruiterLogos : STATIC_LOGOS;
    const mid = Math.ceil(activeList.length / 2);
    const images1 = activeList.slice(0, mid);
    const images2 = activeList.slice(mid).length > 0 ? activeList.slice(mid) : activeList;

    const setupInstances = useCallback(() => {
        if (!innerRef1.current || !outerRef.current) return;
        const { width: innerWidth } = innerRef1.current.getBoundingClientRect();

        const speed = 300; // pixels per second
        setAnimationDuration(innerWidth / speed || 20);
    }, []);

    useEffect(() => {
        setupInstances();
        window.addEventListener('resize', setupInstances);
        return () => window.removeEventListener('resize', setupInstances);
    }, [setupInstances, activeList]);

    return (
        <section className="bg-white w-full py-32">
            <div className="px-6 md:px-20">
                <h2 className="w-auto h-auto text-3xl md:text-4xl lg:text-5xl font-semibold font-bebasneue">
                    . OUR RECRUITERS
                </h2>
            </div>
            <div className="overflow-hidden relative pt-20" ref={outerRef}>
                <ScrollingRow
                    direction="left"
                    innerRef={innerRef1}
                    images={images1}
                    animationDuration={animationDuration}
                />
                <div className="my-10" />
                <ScrollingRow
                    direction="right"
                    innerRef={innerRef2}
                    images={images2}
                    animationDuration={animationDuration}
                />
            </div>
        </section>
    );
};

export default PlacementRecruiters;
