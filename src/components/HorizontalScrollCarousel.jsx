'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import ColoredSection from './ColoredSection';
import { getGalleries } from '@/actions/gallery.action';

const staticImages = [
    { url: '/ImageScroll/s82025.jpeg' },
    { url: '/ImageScroll/s72024.jpeg' },
    { url: '/ImageScroll/image5.jpeg' },
    { url: '/ImageScroll/image6.jpeg' },
    { url: '/ImageScroll/image1.png' },
    { url: '/ImageScroll/image2.png' },
];

const HorizontalScrollCarousel = () => {
    const [items, setItems] = useState(staticImages);
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Fetch dynamic gallery items managed by admin
    useEffect(() => {
        let isMounted = true;
        getGalleries()
            .then((galleries) => {
                if (isMounted && Array.isArray(galleries) && galleries.length > 0) {
                    const dynamic = galleries.map((g) => ({
                        url: g.image,
                        title: g.name || '',
                        description: g.imgDescription || '',
                    }));
                    setItems(dynamic);
                }
            })
            .catch(() => {
                // fallback to static images
            });
        return () => {
            isMounted = false;
        };
    }, []);

    // Check scroll boundaries
    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 20);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener('scroll', checkScroll, { passive: true });
        window.addEventListener('resize', checkScroll);
        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [items]);

    // Manual navigation buttons
    const scrollByAmount = (direction) => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth * 0.75 * direction;
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <ColoredSection color="WHITE">
            <section className="bg-black py-16 sm:py-20 md:py-24 w-full relative overflow-hidden select-none">
                {/* Header & Controls */}
                <div className="container mx-auto px-6 sm:px-12 md:px-16 flex justify-between items-end mb-8 sm:mb-10">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bebasneue text-white tracking-wide">
                            . GALLERY
                        </h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => scrollByAmount(-1)}
                            disabled={!canScrollLeft}
                            aria-label="Scroll gallery left"
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${
                                canScrollLeft
                                    ? 'hover:bg-white hover:text-black hover:border-white cursor-pointer active:scale-95'
                                    : 'opacity-30 cursor-not-allowed'
                            }`}
                        >
                            <FaAngleLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByAmount(1)}
                            disabled={!canScrollRight}
                            aria-label="Scroll gallery right"
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${
                                canScrollRight
                                    ? 'hover:bg-white hover:text-black hover:border-white cursor-pointer active:scale-95'
                                    : 'opacity-30 cursor-not-allowed'
                            }`}
                        >
                            <FaAngleRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div
                    ref={scrollRef}
                    className="flex items-center gap-5 sm:gap-6 md:gap-8 overflow-x-auto overflow-y-hidden px-6 sm:px-12 md:px-16 scroll-smooth snap-x snap-mandatory no-scrollbar"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 snap-start w-[80vw] max-w-[320px] sm:max-w-none sm:w-[360px] md:w-[440px] lg:w-[500px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden group shadow-2xl border border-white/10 bg-[#121212]"
                        >
                            {/* Image */}
                            <img
                                src={item.url}
                                alt={item.title || `CSE Department Gallery photo ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Subtle dark gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Show caption ONLY if dynamic admin title exists */}
                            {item.title ? (
                                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-white text-base sm:text-lg font-bold font-montserrat">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-gray-300 text-xs mt-1 line-clamp-2 font-montserrat">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    ))}
                    {/* Trailing padding spacer */}
                    <div className="flex-shrink-0 w-4 sm:w-8" />
                </div>
            </section>
        </ColoredSection>
    );
};

export default HorizontalScrollCarousel;
