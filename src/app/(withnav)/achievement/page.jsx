'use client';
import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaSquareFull } from 'react-icons/fa6';
import ColoredSection from '../../../components/ColoredSection';
import Acheivers from './acheivers/page';
import AcheiversHorizontalScrollCarousel from './acheiversHorizontalScroll/page';

const placements = [
    {
        title: 'Placed at Amazon',
        description:
            'Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....',
        name: 'Jane Doe',
        batch: '2025 Pass out Batch',
    },
    {
        title: 'Placed at Amazon',
        description:
            'Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....',
        name: 'Jane Doe',
        batch: '2025 Pass out Batch',
    },
    {
        title: 'Placed at Amazon',
        description:
            'Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....',
        name: 'Jane Doe',
        batch: '2025 Pass out Batch',
    },
];

const PlacementCard = ({ title, description, name, batch, isActive }) => (
    <div className="w-full p-4 flex-col justify-end items-start gap-4 inline-flex">
        <div
            className={`text-base font-medium font-['Montserrat'] uppercase duration-500 transition-all ${
                isActive ? 'text-[#DD846E]' : 'text-black'
            }`}
        >
            {title}
        </div>
        <div
            className={`self-stretch text-sm font-normal font-['Montserrat'] duration-500 transition-all ${
                isActive ? 'text-[#DD846E]' : 'text-[#696969]'
            }`}
        >
            {description}
        </div>
        <div
            className={`self-stretch h-[0px] border-2 duration-500 transition-all ${
                isActive ? 'border-[#DD846E]' : 'border-[#9e9e9e] '
            }`}
        ></div>
        <div className="self-stretch justify-between items-end inline-flex">
            <div className="h-[38px] justify-start items-center gap-[10px] flex">
                <div className="w-auto h-[38px] flex-col justify-between items-start inline-flex">
                    <div
                        className={`self-stretch text-sm font-normal font-['Montserrat'] tracking-wide duration-500 transition-all ${
                            isActive ? 'text-[#DD846E]' : 'text-black'
                        }`}
                    >
                        {name}
                    </div>
                    <div
                        className={`self-stretch text-xs font-normal font-['Montserrat'] duration-500 transition-all tracking-wide ${
                            isActive ? 'text-[#DD846E]' : 'text-[#696969]'
                        }`}
                    >
                        {batch}
                    </div>
                </div>
            </div>
            <div className="p-2 bg-[#696969] text-white hover:bg-white hover:text-[#DD846E] hover:border-[#DD846E] border-2 justify-center items-center gap-2 flex duration-500 transition-all rounded-md">
                <p className="origin-top-left text-sm font-medium font-['Montserrat']">
                    Read More
                </p>
            </div>
        </div>
    </div>
);

const ExpandableCards = ({ title, placements }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [cardWidth, setCardWidth] = useState('100%');
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 620) {
                setCardWidth('90%');
            } else if (window.innerWidth < 768) {
                setCardWidth('90%');
            } else if (window.innerWidth < 1024) {
                setCardWidth('85%');
            } else if (window.innerWidth < 1440) {
                setCardWidth('80%');
            } else {
                setCardWidth('75%');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleExpand = () => setIsExpanded((prev) => !prev);

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    return (
        <div className="w-full flex justify-center overflow-hidden">
            <div
                style={{ width: cardWidth }}
                onClick={toggleExpand}
                className={`flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-4 sm:p-6 rounded-lg ${
                    isExpanded ? 'mb-5' : ''
                }`}
            >
                <div className="flex justify-between items-center">
                    <div
                        className={`font-bold transition-all duration-700 flex items-center group-hover:text-black group-hover:text-lg md:group-hover:text-xl lg:group-hover:text-2xl pl-2 md:pl-5 ${
                            isExpanded
                                ? 'text-black text-lg md:text-xl lg:text-2xl lg:pb-8'
                                : 'text-black'
                        } cursor-pointer`}
                        style={{
                            fontFamily: 'Bebas Neue',
                            fontWeight: 400,
                            lineHeight: '1.2',
                            textAlign: 'center',
                        }}
                    >
                        <FaSquareFull
                            className={`translate-y-1 md:translate-y-[19px] duration-1000 transition-all ${
                                isExpanded
                                    ? 'text-[3px] md:text-[4px] lg:text-[5px] mr-1 md:mr-2'
                                    : 'text-[0px] mr-0 text-[#696969]'
                            }`}
                        />
                        <span className="text-[1.5rem]">{title}</span>
                    </div>
                    <div
                        onClick={toggleExpand}
                        className={`transition-transform opacity-0 group-hover:opacity-100 cursor-pointer ${
                            isExpanded ? 'rotate-180 opacity-100' : ''
                        } duration-[1s] ease-in-out z-10`}
                    >
                        <MdKeyboardArrowDown className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-8 text-[#9E9E9E]" />
                    </div>
                </div>
                <div
                    className={`transition-all duration-[1s] h-auto overflow-hidden ${
                        isExpanded
                            ? 'opacity-100 max-h-screen'
                            : 'opacity-0 max-h-0'
                    } px-2 md:px-5`}
                >
                    <div className="w-full flex-col justify-start items-start gap-4 inline-flex mt-4">
                        {placements.map((placement, index) => (
                            <React.Fragment key={index}>
                                <div
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className="w-full"
                                >
                                    <PlacementCard
                                        {...placement}
                                        isActive={index === hoverIndex}
                                    />
                                </div>
                                {index < placements.length - 1 && (
                                    <div className="self-stretch h-[0px] border-2 border-[#696969]"></div>
                                )}
                            </React.Fragment>
                        ))}
                        <div className="self-stretch h-auto px-[69px] py-2 flex-col justify-center items-center gap-2.5 flex">
                            <div className="w-auto h-auto p-2.5 bg-[#696969] border-2 justify-center items-center gap-[10px] inline-flex text-white hover:bg-white hover:text-[#DD846E] hover:border-[#DD846E] duration-500 transition-all rounded-sm">
                                <p className="origin-top-left text-base font-medium font-['Montserrat']">
                                    LOAD MORE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <ColoredSection className="pt-16" color="BLACK">
            <Acheivers />
            <ExpandableCards title="SUCCESS STORIES" placements={placements} />
            <ExpandableCards title="ALUMNI STORIES" placements={placements} />
            <AcheiversHorizontalScrollCarousel />
        </ColoredSection>
    );
};

export default Page;
