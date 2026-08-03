'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import studentsByCategory from '../../../../constants/contents';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import './style.css';

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={className}>
            <HiArrowRight className="arrows" />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={className}>
            <HiArrowLeft className="arrows" />
        </div>
    );
}

const CategoryCarousel = ({ category, students }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrow: false,
        nextArrow: <NextArrow to="next" />,
        prevArrow: <PrevArrow to="prev" />,
    };

    return (
        <div className="student-card w-full h-full card">
            <Slider {...settings}>
                {students.map((student, index) => (
                    <div key={index} className="mx-auto">
                        <div className="h-auto w-full">
                            <div className="flex flex-col bg-white justify-start items-center h-auto w-full max-w-[280px] mx-auto shadow-md rounded-lg overflow-hidden">
                                <div className="stud-image w-full h-[220px] transition-all duration-[1s]">
                                    <img
                                        src={student.image}
                                        alt={student.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="stud-details w-full h-auto text-center flex flex-col p-4">
                                    <p className="text-black text-base font-semibold mb-2">
                                        {student.name}
                                    </p>
                                    <div className="w-full min-h-[60px] mb-2">
                                        <p className="text-gray-500 text-sm">
                                            {student.batch}
                                        </p>
                                        {student.cgpa && (
                                            <p className="text-gray-500 text-sm">
                                                CGPA: {student.cgpa}
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-sm">
                                            {student.desc}
                                        </p>
                                    </div>
                                    <p className="text-white font-semibold text-sm w-full bg-[#DD846E] py-[4px]">
                                        {category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const Page = () => {
    return (
        <div className="container mx-auto bg-white py-8 px-4 sm:py-14 sm:px-6 h-full">
            <div className="bg-[#e9e9e8] w-full h-full p-4 sm:p-6 rounded-lg">
                <div className="flex justify-start w-full h-full mb-6">
                    <h1 className="text-black font-bold font-bebasneue text-3xl sm:text-4xl lg:text-5xl">
                        . ACHIEVERS
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {Object.keys(studentsByCategory).map((category, index) => (
                        <CategoryCarousel
                            key={index}
                            category={category}
                            students={studentsByCategory[category]}
                        />
                    ))}
                </div>
                <div className="text-center w-full pt-10">
                    <a
                        href="achievement/more-achievers"
                        className="inline-flex justify-center items-center w-full sm:w-auto px-6 py-2 text-center text-white font-bold text-[16px] bg-[#DD846E] hover:bg-[#C7745E] transition-colors duration-300 rounded-md hover:no-underline"
                    >
                        LOAD MORE
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Page;
