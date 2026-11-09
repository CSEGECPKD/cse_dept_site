'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

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
                className="inline-block px-10 flex-none"
            />
        ))}
    </div>
);

const PlacementRecruiters = () => {
    const outerRef = useRef(null);
    const innerRef1 = useRef(null);
    const innerRef2 = useRef(null);
    const [animationDuration, setAnimationDuration] = useState(20);

    const setupInstances = useCallback(() => {
        if (!innerRef1.current || !outerRef.current) return;
        const { width: innerWidth } = innerRef1.current.getBoundingClientRect();

        const speed = 300; // pixels per second
        setAnimationDuration(innerWidth / speed);
    }, []);

    useEffect(() => {
        setupInstances();
        window.addEventListener('resize', setupInstances);
        return () => window.removeEventListener('resize', setupInstances);
    }, [setupInstances]);

    const images1 = [
        '/recruiters/cognizant.jpg',
        '/recruiters/tata.jpg',
        '/recruiters/ust.jpg',
        '/recruiters/qburst.jpg',
        '/recruiters/keltron.jpg',
        '/recruiters/experion.jpg',
        '/recruiters/LandT.jpg',
    ];

    const images2 = [
        '/recruiters/pennyflo.jpg',
        '/recruiters/xyvin.jpg',
        '/recruiters/zendalona.jpg',
        '/recruiters/cognizant.jpg',
        '/recruiters/tata.jpg',
        '/recruiters/ust.jpg',
        '/recruiters/qburst.jpg',
    ];

    return (
        <section className="bg-white w-full py-32">
            <div className="px-20">
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
                <div className="my-10" />
                <ScrollingRow
                    direction="left"
                    images={images1}
                    animationDuration={animationDuration}
                />
                <div className="my-10" />
                <ScrollingRow
                    direction="right"
                    images={images2}
                    animationDuration={animationDuration}
                />
                <style jsx>{`
                    @keyframes scrollLeft {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes scrollRight {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default PlacementRecruiters;
