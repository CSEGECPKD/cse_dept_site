'use client';
import { DeptConstants } from '@/constants/DeptConstants';
import { FaAngleRight, FaArrowRightLong } from 'react-icons/fa6';
import ColoredSection from './ColoredSection';

const DeptInfo = ({ isAboutPage = false }) => {
    return (
        <ColoredSection color="BLACK">
            <div
                className="bg-white w-full px-12 md:px-20 py-16 nav-md:py-8"
                id="dept"
            >
                <div className="nav-md:pt-20">
                    <div className="w-full relative">
                        <div className="">
                            <h2
                                className={`font-semibold text-3xl sm:text-4xl md:text-4xl block`}
                            >
                                The Department of Computer Science and
                                Engineering
                            </h2>
                            <p
                                className="text-gray-600 sm:text-xl pt-4 text-xl nav-md:text-xl"
                                // style={{ paddingTop: showDivs ? "" : `${paddingVal * 2}px` }}
                            >
                                {DeptConstants.desc}
                            </p>
                            <a
                                href="/aboutus"
                                className="inline-flex items-center group bg-black hover:bg-white text-white hover:text-black border-2 border-black p-2 mt-8 transition-all duration-300 ease-in-out transform hover:pr-6"
                            >
                                Read More
                                <span className="inline-flex items-center justify-center ml-2 w-auto h-auto transform group-hover:translate-x-3 transition-all duration-300 ease-in-out">
                                    <FaAngleRight className="group-hover:hidden text-white transition-all duration-300 ease-in-out" />
                                    <FaArrowRightLong className="hidden group-hover:inline-flex text-black transition-all duration-300 ease-in-out" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
};

export default DeptInfo;
