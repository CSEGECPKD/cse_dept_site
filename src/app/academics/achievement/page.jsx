"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa6";
import ColoredSection from "../../../components/ColoredSection";
import Acheivers from "./acheivers/page";
import AcheiversHorizontalScrollCarousel from "./acheiversHorizontalScroll/page";

const placements = [
  {
    title: "Placed at Amazon",
    description:
      "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
    name: "Jane Doe",
    batch: "2025 Pass out Batch",
  },
  {
    title: "Placed at Amazon",
    description:
      "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
    name: "Jane Doe",
    batch: "2025 Pass out Batch",
  },
  {
    title: "Placed at Amazon",
    description:
      "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
    name: "Jane Doe",
    batch: "2025 Pass out Batch",
  },
];

const PlacementCard = ({ title, description, name, batch, isActive }) => (
  <div className="grow shrink basis-0 p-[15px] flex-col justify-end items-start gap-[20px] inline-flex">
    <div
      className={` text-xl font-medium font-['Montserrat'] uppercase duration-500 transition-all ${
        isActive ? "text-[#DD846E]" : "text-black"
      }`}
    >
      {title}
    </div>
    <div
      className={`self-stretch text-lg font-normal font-['Montserrat'] duration-500 transition-all ${
        isActive ? "text-[#DD846E]" : "text-[#696969]"
      }`}
    >
      {description}
    </div>
    <div
      className={`self-stretch h-[0px] border-2 duration-500 transition-all ${
        isActive ? "border-[#DD846E]" : "border-[#9e9e9e] "
      }`}
    ></div>
    <div className="self-stretch justify-between items-end inline-flex">
      <div className="h-[38px] justify-start items-center gap-[10px] flex">
        <div className="w-auto h-[38px] flex-col justify-between items-start inline-flex">
          <div
            className={`self-stretch text-lg font-normal font-['Montserrat'] tracking-wide duration-500 transition-all ${
              isActive ? "text-[#DD846E]" : "text-black"
            }`}
          >
            {name}
          </div>
          <div
            className={`self-stretch  text-base font-normal font-['Montserrat'] duration-500 transition-all tracking-wide ${
              isActive ? "text-[#DD846E]" : "text-[#696969]"
            }`}
          >
            {batch}
          </div>
        </div>
      </div>
      <div className="p-2.5 bg-[#696969] text-white hover:bg-white hover:text-[#DD846E] hover:border-[#DD846E] border-2 justify-center items-center gap-[15px] flex duration-500 transition-all rounded-md">
        <p className="origin-top-left text-lg font-medium font-['Montserrat']">
          Read More
        </p>
      </div>
    </div>
  </div>
);

const ExpandableCards = ({ title, placements }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className="container w-screen flex justify-center overflow-hidden mx-auto px-4 sm:px-6 pb-[2px]">
      <div
        className={`group w-full flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] pt-5 p-3 ${
          isExpanded ? "mb-5 mt-5" : ""
        }`}
      >
        <div className="flex justify-between">
          <div
            onClick={toggleExpand}
            className={`group font-bold transition-all duration-700 flex font-bebasneue lg:text-5xl text-4xl pl-5 cursor-pointer ${
              isExpanded ? "text-black" : "text-[#696969]"
            }`}
          >
            <FaSquareFull
              className={`translate-y-[29px] duration-700 transition-all group-hover:text-[8px] group-hover:mr-2 ${
                isExpanded
                  ? "text-[8px] mr-2 text-black"
                  : "text-[0px] text-[#696969] mr-0"
              }`}
            />
            {title}
          </div>
          <div
            onClick={toggleExpand}
            className={`transition-transform opacity-0 group-hover:opacity-100 cursor-pointer ${
              isExpanded ? "rotate-180 opacity-100" : ""
            } duration-[1s] ease-in-out z-10`}
          >
            <MdKeyboardArrowDown className="w-10 h-8 text-[#9E9E9E]" />
          </div>
        </div>

        <div
          className={`transition-all duration-[1s] px-5 overflow-hidden ${
            isExpanded ? "opacity-100 h-auto" : "opacity-0 h-0"
          }`}
        >
          <div className="w-full flex-col justify-start items-start gap-4 inline-flex mt-4">
            {placements.map((placement, index) => (
              <React.Fragment key={index}>
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
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
