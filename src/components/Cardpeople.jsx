'use client';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaSquareFull } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { ImCross } from 'react-icons/im';
import '@/components/nooverflow.css';
import { cn } from '@/lib/utils';
import { getFaculties } from '@/actions/faculty.action';

const ExpandableCards = ({ title, item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDescVisible, setIsDescVisible] = useState(null);
    const [isHover, setIsHover] = useState(false);

    const toggleVisible = (id) => {
        setIsDescVisible(isDescVisible === id ? null : id);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="w-screen flex justify-center overflow-hidden">
            <div
                className={cn(
                    'group w-[90%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3',
                    { 'mb-5 mt-5': isExpanded }
                )}
            >
                <div className="flex justify-between">
                    <div
                        onClick={toggleExpand}
                        className={cn(
                            'group font-bold transition-all duration-700 flex lg:text-2xl text-lg pl-5 cursor-pointer',
                            {
                                'text-black': isExpanded,
                                'text-[#696969]': !isExpanded,
                            }
                        )}
                    >
                        <FaSquareFull
                            className={cn(
                                'translate-y-[19px] duration-700 transition-all group-hover:text-[5px] group-hover:mr-2',
                                {
                                    'text-[5px] mr-2 text-black': isExpanded,
                                    'text-[0px] text-[#696969] mr-0':
                                        !isExpanded,
                                }
                            )}
                        />
                        {title}
                    </div>
                    <div
                        onClick={toggleExpand}
                        className={cn(
                            'transition-transform opacity-0 group-hover:opacity-100 cursor-pointer',
                            { 'rotate-180 opacity-100': isExpanded }
                        )}
                    >
                        <MdKeyboardArrowDown className="w-10 h-8 text-[#9E9E9E]" />
                    </div>
                </div>

                <div
                    className={cn(
                        'transition-all duration-[1s] h-auto overflow-hidden',
                        {
                            'opacity-100': isExpanded,
                            'opacity-0 max-h-0': !isExpanded,
                        }
                    )}
                >
                    <div className="flex pb-3">
                        <div
                            className={cn(
                                'no-scrollbar flex flex-wrap flex-initial max-h-full overflow-auto justify-items-start w-full transition-all duration-[1s] ease-in-out gap-3 mb-3 px-5'
                            )}
                        >
                            {item.map((data, key) => (
                                <Fragment key={data._id ?? key}>
                                    <div
                                        className={cn(
                                            'bg-white group/items hover:bg-[#DD846E] w-[240px] transition-all duration-800 cursor-pointer',
                                            {
                                                'bg-[#DD846E]':
                                                    isDescVisible === key,
                                            }
                                        )}
                                        onClick={() => toggleVisible(key)}
                                        onMouseEnter={() => setIsHover(true)}
                                        onMouseLeave={() => setIsHover(false)}
                                    >
                                        <img
                                            className="w-full h-[300px] bg-cover bg-no-repeat bg-center object-cover group-hover/items:grayscale"
                                            src={
                                                data.imageUrl ??
                                                '/images/card.jpeg'
                                            }
                                            alt={data.name}
                                        />
                                        <div className="p-3 leading-3">
                                            <h1 className="text-xl font-bold group-hover/items:text-white">
                                                {data.name}
                                            </h1>
                                            <p className="text-[#9E9E9E] group-hover/items:text-white">
                                                {isHover
                                                    ? 'Click to know more'
                                                    : `${data.designation ?? ''}`}
                                            </p>
                                        </div>
                                    </div>
                                    {isDescVisible === key && (
                                        <div className="fixed w-screen h-screen top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center z-10">
                                            <motion.div className="flex gap-5 relative w-[80%] h-[30%] lg:w-2/5 p-5 lg:h-2/4 border-solid z-10 bg-white bg-opacity-20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-lg">
                                                <div
                                                    className="absolute top-[-30px] gap-2 right-0 w-auto flex items-center cursor-pointer bg-white/60 p-1"
                                                    onClick={toggleVisible}
                                                >
                                                    <span>Close</span>
                                                    <ImCross className="" />
                                                </div>
                                                <div className="w-1/3 h-full bg-cover pr-5 border-solid border-r-2">
                                                    <div
                                                        className="w-full h-[65%] bg-no-repeat bg-cover bg-center"
                                                        style={{
                                                            backgroundImage: `url(${
                                                                data.imageUrl ??
                                                                '/images/card.jpeg'
                                                            })`,
                                                        }}
                                                    ></div>
                                                    <div className="w-full pt-3">
                                                        <div className="lg:text-[1.25rem] text-[0.55rem] w-full">
                                                            {data.name}
                                                        </div>
                                                        <div className="lg:text-[0.8rem] text-[0.3rem] text-[#696969] w-full">
                                                            {data.designation}
                                                        </div>
                                                        <div className="lg:text-[0.8rem] text-[0.3rem] text-[#696969] w-full">
                                                            {data.email}
                                                        </div>
                                                        <div className="lg:text-[0.8rem] text-[0.3rem] text-[#696969] w-full">
                                                            {data.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pl-3 no-scrollbar overflow-y-auto w-2/3">
                                                    <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                                        Employee Details
                                                    </h1>
                                                    <ul className="list-disc py-2">
                                                        <li className="lg:text-[0.8rem] text-[0.3rem] leading-8 text-[#696969]">
                                                            {data.employeeType}
                                                        </li>
                                                        <li className="lg:text-[0.8rem] text-[0.3rem] leading-8 text-[#696969]">
                                                            Date of Joining:{' '}
                                                            {data.dateOfJoining
                                                                ? new Date(
                                                                      data.dateOfJoining
                                                                  ).toLocaleDateString(
                                                                      'en-US',
                                                                      {
                                                                          year: 'numeric',
                                                                          month: 'long',
                                                                          day: 'numeric',
                                                                      }
                                                                  )
                                                                : ''}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function cardpeople() {
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFaculties() {
            try {
                const data = await getFaculties();
                setFaculties(data);
            } catch (error) {
                console.error('Error fetching faculties:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchFaculties();
    }, []);

    const groups = faculties.reduce((acc, faculty) => {
        const type = faculty.employeeType || 'Others';
        if (!acc[type]) acc[type] = [];
        acc[type].push(faculty);
        return acc;
    }, {});

    return (
        <div className="flex flex-col overflow-hidden min-h-[400px] mt-[15rem]">
            {loading ? (
                <div className="container mx-auto py-20 text-center">
                    <p className="text-xl">Loading faculties...</p>
                </div>
            ) : Object.keys(groups).length === 0 ? (
                <div className="container mx-auto py-20 text-center">
                    <p className="text-xl">No faculties found</p>
                </div>
            ) : (
                <div className="w-full">
                    {Object.keys(groups).map((type) => (
                        <ExpandableCards
                            key={type}
                            title={type.toUpperCase()}
                            item={groups[type]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default cardpeople;
