"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa6";
import { motion } from "framer-motion";

const ExpandableCards = ({ title, item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const anim = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const ranges = Object.values(item).map((item) => item.year);

  const sortedRanges = ranges.sort((a, b) => {
    const [startA] = a.split("-").map(Number);
    const [startB] = b.split("-").map(Number);

    return startB - startA;
  });
  const year = sortedRanges.filter(
    (item, index) => sortedRanges.indexOf(item) === index
  );

  const [selectedContent, setselectedContent] = useState(year[0]);

  const handleyear = (item) => {
    setselectedContent(item);
    setIsOpen(false);
  };
  const items = item.filter((data) => data.year === selectedContent);

  // useEffect(() => {
  //   if (isExpanded) {
  //     setTimeout(() => {
  //       setIsContentVisible(true);
  //     }, 1000);
  //   }
  // }, [isExpanded]);

  return (
    <div className="w-screen  flex  justify-center overflow-hidden">
      <div
        className={`group w-[90%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3  ${
          isExpanded ? "mb-5" : ""
        } }`}
      >
        <div className="flex justify-between">
          <div
            onClick={toggleExpand}
            className={`font-bold transition-all duration-700 flex group-hover:text-black group-hover:text-2xl pl-5 ${
              isExpanded ? "text-black text-2xl" : "text-[#696969]"
            } cursor-pointer`}
          >
            <FaSquareFull
              className={`translate-y-[19px] duration-1000 transition-all ${
                isExpanded
                  ? "text-[5px] mr-2 "
                  : "text-[0px] mr-0 text-[#696969]"
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
          className={` transition-all duration-[1s] h-auto overflow-hidden  ${
            isExpanded ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
        >
          <div className="pb-2 pl-5 flex gap-5 text-[#696969] items-center ">
            Acadamics Year
            <div>
              <div
                onClick={toggleOpen}
                className="relative flex items-center group/year px-2 text-[#696969] cursor-pointer"
              >
                {selectedContent}
                <div
                  onClick={toggleOpen}
                  className={`transition-transform opacity-0 group-hover/year:opacity-100 cursor-pointer ${
                    isOpen ? "rotate-180 opacity-100" : ""
                  } duration-500 ease-in-out z-10`}
                >
                  <MdKeyboardArrowDown className="w-10 h-8 text-[#9E9E9E]" />
                </div>
              </div>
              <div className="relative">
                <div
                  className={`absolute transition-all duration-500 h-auto overflow-hidden  ${
                    isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
                  }`}
                >
                  {year.map((item, index) => (
                    <div
                      onClick={() => handleyear(item)}
                      key={index}
                      className="px-2 bg-[#E9E9E8] text-[#696969] cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-h-screen pb-3">
            <div
              className={`no-scrollbar flex flex-wrap flex-initial max-h-full  overflow-auto justify-items-start w-full transition-all duration-[1s] ease-in-out gap-3 mb-3 px-5 `}
            >
              {items.map((data, key) => (
                <motion.div
                  variants={anim}
                  key={key}
                  className="bg-white h-[313px] w-[240px]"
                >
                  <div
                    className="w-full h-[77%] bg-cover bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${data.link})` }}
                  ></div>
                  <div className="p-3 leading-3">
                    <h1 className="text-xl font-bold">{data.name}</h1>
                    <p className="text-[#9E9E9E]">{data.postion}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Student({ title, item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const anim = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const ranges = Object.values(item).map((item) => item.year);

  const sortedRanges = ranges.sort((a, b) => {
    const [startA] = a.split("-").map(Number);
    const [startB] = b.split("-").map(Number);

    return startB - startA;
  });
  const year = sortedRanges.filter(
    (item, index) => sortedRanges.indexOf(item) === index
  );

  const [selectedContent, setselectedContent] = useState(year[0]);

  const handleyear = (item) => {
    setselectedContent(item);
    setIsOpen(false);
  };
  const items = item.filter((data) => data.year === selectedContent);

  return (
    <div className="w-screen  flex  justify-center overflow-hidden">
      <div
        className={`group w-[90%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3  ${
          isExpanded ? "mb-5" : ""
        } }`}
      >
        <div className="flex justify-between">
          <div
            onClick={toggleExpand}
            className={`font-bold transition-all duration-700 flex group-hover:text-black group-hover:text-2xl pl-5 ${
              isExpanded ? "text-black text-2xl" : "text-[#696969]"
            } cursor-pointer`}
          >
            <FaSquareFull
              className={`translate-y-[19px] duration-1000 transition-all ${
                isExpanded
                  ? "text-[5px] mr-2 "
                  : "text-[0px] mr-0 text-[#696969]"
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
          className={` transition-all duration-[1s] h-auto   ${
            isExpanded ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
        >
          <div className="pb-2 pl-5 flex gap-5 text-[#696969] items-center ">
            Acadamics Year
            <div>
              <div
                onClick={toggleOpen}
                className="relative flex items-center group/year px-2 text-[#696969] cursor-pointer"
              >
                {selectedContent}
                <div
                  onClick={toggleOpen}
                  className={`transition-transform opacity-0 group-hover/year:opacity-100 cursor-pointer ${
                    isOpen ? "rotate-180 opacity-100" : ""
                  } duration-500 ease-in-out z-10`}
                >
                  <MdKeyboardArrowDown className="w-10 h-8 text-[#9E9E9E]" />
                </div>
              </div>
              <div className="relative">
                <div
                  className={`absolute transition-all duration-500  ${
                    isOpen ? "opacity-100 max-h-max" : "opacity-0 max-h-0"
                  }`}
                >
                  {year.map((item, index) => (
                    <div
                      onClick={() => handleyear(item)}
                      key={index}
                      className="px-2 bg-[#E9E9E8] text-[#696969] cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex  pb-3">
            <div
              className={`no-scrollbar flex  flex-wrap  flex-initial overflow-auto max-h-screen min-h-max h-auto justify-between w-full  gap-3  px-5 `}
            >
              {items.map((data, key) => (
                <div className="leading-9 pt-1" key={key}>
                  <h1 className="text-[54px] text-[#696969]">{data.name}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cardpeople() {
  const item1 = [
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2023-24",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2021-22",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2021-22",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2023-24",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2020-21",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2023-24",
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2023-24",
    },
  ];
  const studitem = [
    {
      name: "Muhammed Ali",
      year: "2023-24",
    },
    {
      name: "Aleena O K",
      year: "2023-24",
    },
    {
      name: "Nandana A S",
      year: "2023-24",
    },
    {
      name: "Nandana V S",
      year: "2023-24",
    },
    {
      name: "Bimal Devasia",
      year: "2023-24",
    },
    {
      name: "Devadarsh M R",
      year: "2023-24",
    },
    {
      name: "Aswathy Krishna",
      year: "2023-24",
    },
    {
      name: "Yamuna Jayakumar",
      year: "2023-24",
    },
    {
      name: "Agnes Davies",
      year: "2023-24",
    },
    {
      name: "Jubuhan TT",
      year: "2023-24",
    },
    {
      name: "Vivek PS",
      year: "2023-24",
    },
    {
      name: "Amal Joseph",
      year: "2023-24",
    },
    {
      name: "Amal Joseph",
      year: "2023-24",
    },
    {
      name: "Sabari Kannan KR",
      year: "2023-24",
    },
    {
      name: "Almir Rimon MP",
      year: "2023-24",
    },
    {
      name: "Devadarsh M R",
      year: "2023-24",
    },
  ];

  return (
    <div className="flex flex-col justify-center idata-center overflow-hidden">
      <div className="w-min">
        <ExpandableCards title="TEACHING STAFFS" item={item1} />
        <ExpandableCards title="TECHNICAL STAFFS" item={item1} />
        <ExpandableCards title="ASSOCIATION MEMBER" item={item1} />
        <Student title="STUDENTS" item={studitem} />
        <ExpandableCards title="ALUMNI" item={item1} />
      </div>
    </div>
  );
}

export default cardpeople;
