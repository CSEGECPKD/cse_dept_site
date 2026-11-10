'use client';

import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import './style.css';

function NextArrow({ onClick }) {
    return (
        <div onClick={onClick} className="slick-next">
            <HiArrowRight className="arrows" />
        </div>
    );
}

function PrevArrow({ onClick }) {
    return (
        <div onClick={onClick} className="slick-prev">
            <HiArrowLeft className="arrows" />
        </div>
    );
}

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

function TopperCard({ topper, category }) {
    return (
        <div className="flex flex-col bg-white justify-start items-center h-auto w-full max-w-[280px] mx-auto shadow-md rounded-lg overflow-hidden">
            <div className="w-full h-[220px] overflow-hidden">
                <img
                    src={topper.imageUrl || '/people/student-1.jpg'}
                    alt={topper.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full h-auto text-center flex flex-col p-4">
                <p className="text-black text-base font-semibold mb-2">
                    {topper.name}
                </p>
                <div className="w-full min-h-[60px] mb-2">
                    {topper.batch && (
                        <p className="text-gray-500 text-sm">{topper.batch}</p>
                    )}
                    {topper.cgpa > 0 && (
                        <p className="text-gray-500 text-sm">
                            CGPA: {topper.cgpa}
                        </p>
                    )}
                    {topper.sem && (
                        <p className="text-gray-500 text-sm">{topper.sem}</p>
                    )}
                </div>
                <p className="text-white font-semibold text-sm w-full bg-[#DD846E] py-[4px]">
                    {category}
                </p>
            </div>
        </div>
    );
}

function CategoryCarousel({ category, toppers }) {
    return (
        <div className="student-card w-full h-full card">
            <Slider {...sliderSettings}>
                {toppers.map((t, i) => (
                    <div key={t._id || i} className="mx-auto">
                        <div className="h-auto w-full">
                            <TopperCard topper={t} category={category} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default function AchieversClient({ byCategory }) {
    const categories = Object.keys(byCategory);

    return (
        <div className="container mx-auto bg-white py-8 px-4 sm:py-14 sm:px-6 h-full">
            <div className="bg-[#e9e9e8] w-full h-full p-4 sm:p-6 rounded-lg">
                <div className="flex justify-start w-full h-full mb-6">
                    <h1 className="text-black font-bold font-bebasneue text-3xl sm:text-4xl lg:text-5xl">
                        . ACHIEVERS
                    </h1>
                </div>

                {categories.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">
                        No achievers to display yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {categories.map((category) => (
                            <CategoryCarousel
                                key={category}
                                category={category}
                                toppers={byCategory[category]}
                            />
                        ))}
                    </div>
                )}

                <div className="text-center w-full pt-10">
                    <Link
                        href="/achievement/more-acheivers"
                        className="inline-flex justify-center items-center w-full sm:w-auto px-6 py-2 text-center text-white font-bold text-[16px] bg-[#DD846E] hover:bg-[#C7745E] transition-colors duration-300 rounded-md hover:no-underline"
                    >
                        LOAD MORE
                    </Link>
                </div>
            </div>
        </div>
    );
}

