"use client";
import React, { Fragment } from "react";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import "@/components/nooverflow.css";
import { cn } from "@/lib/utils";
import { FACULTYDATA, TECHSTAFF } from "@/data/faculty";

const ExpandableCards = ({ title, item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(null);
  const [isHover, setIsHover] = useState(false);

  const toggleVisible = (id) => {
    setIsDescVisible(isDescVisible === id ? null : id);
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
    (item, index) => sortedRanges.indexOf(item) === index,
  );

  const [selectedContent, setselectedContent] = useState(year[0]);

  const handleyear = (item) => {
    setselectedContent(item);
    setIsOpen(false);
  };
  const items = item.filter((data) => data.year === selectedContent);

  return (
    <div className="w-screen flex justify-center overflow-hidden">
      <div
        className={cn(
          "group w-[90%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3",
          { "mb-5 mt-5": isExpanded },
        )}
      >
        <div className="flex justify-between">
          <div
            onClick={toggleExpand}
            className={cn(
              "group font-bold transition-all duration-700 flex lg:text-2xl text-lg pl-5",
              { "text-black": isExpanded, "text-[#696969]": !isExpanded },
            )}
          >
            <FaSquareFull
              className={cn(
                "translate-y-[19px] duration-700 transition-all group-hover:text-[5px] group-hover:mr-2",
                {
                  "text-[5px] mr-2 text-black": isExpanded,
                  "text-[0px] text-[#696969] mr-0": !isExpanded,
                },
              )}
            />
            {title}
          </div>
          <div
            onClick={toggleExpand}
            className={cn(
              "transition-transform opacity-0 group-hover:opacity-100 cursor-pointer",
              { "rotate-180 opacity-100": isExpanded },
            )}
          >
            <MdKeyboardArrowDown className="w-10 h-8 text-[#9E9E9E]" />
          </div>
        </div>

        <div
          className={cn("transition-all duration-[1s] h-auto overflow-hidden", {
            "opacity-100": isExpanded,
            "opacity-0 max-h-0": !isExpanded,
          })}
        >
          <div className="pb-2 pl-5 flex gap-5 text-[#696969] items-center lg:text-base text-xs ">
            <div>
              <div
                onClick={toggleOpen}
                className="relative flex items-center group/year px-2 text-[#696969] cursor-pointer"
              >
                {selectedContent}
                <div
                  onClick={toggleOpen}
                  className={cn(
                    "transition-transform opacity-0 group-hover/year:opacity-100 cursor-pointer",
                    { "rotate-180 opacity-100": isOpen },
                  )}
                >
                  <MdKeyboardArrowDown className={`w-10 h-8 text-[#9E9E9E] `} />
                </div>
              </div>
              <div className="relative">
                <div
                  className={cn(
                    "absolute transition-all duration-500 h-auto overflow-hidden",
                    {
                      "opacity-100": isOpen,
                      "opacity-0 max-h-0": !isOpen,
                    },
                  )}
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
          <div className="flex pb-3">
            <div
              className={cn(
                "no-scrollbar flex flex-wrap flex-initial max-h-full  overflow-auto justify-items-start w-full transition-all duration-[1s] ease-in-out gap-3 mb-3 px-5",
              )}
            >
              {items.map((data, key) => (
                <Fragment key={key}>
                  <div
                    className={cn(
                      "bg-white group/items  hover:bg-[#DD846E] w-[240px] transition-all duration-800  cursor-pointer",
                      { "bg-[#DD846E]": isDescVisible === key },
                    )}
                    onClick={() => toggleVisible(key)}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                  >
                    <img
                      className=" w-full h-[300px] bg-cover bg-no-repeat bg-center group-hover/items:grayscale"
                      style={{
                        backgroundImage: `url(${
                          data.imageUrl ?? "/images/card.jpeg"
                        })`,
                      }}
                    ></img>
                    <div className="p-3 leading-3 ">
                      <h1 className="text-xl font-bold group-hover/items:text-white">
                        {data.name}
                      </h1>
                      <p className="text-[#9E9E9E] group-hover/items:text-white">
                        {isHover
                          ? "Click to know more"
                          : `${data.designation ?? ""}`}
                      </p>
                    </div>
                  </div>
                  {isDescVisible === key && (
                    <div className="fixed  w-screen h-screen group-ho top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center z-10">
                      <motion.div className="flex gap-5 relative w-[80%] h-[30%] lg:w-2/5 p-5 lg:h-2/4 border-solid z-10 bg-white bg-opacity-20  shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  backdrop-blur-lg">
                        <div
                          className="absolute top-[-30px] gap-2 right-0 w-auto flex items-center cursor-pointer bg-white/60 p-1"
                          onClick={toggleVisible}
                        >
                          <span>Close</span>
                          <ImCross className="" />
                        </div>
                        <div className="w-1/3 h-full bg-cover pr-5  border-solid border-r-2">
                          <div
                            className=" w-full h-[65%] bg-no-repeat bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${
                                data.imageUrl ?? "/images/card.jpeg"
                              })`,
                            }}
                          ></div>
                          <div className="w-full pt-3 ">
                            <div className="lg:text-[1.25rem] text-[0.55rem] w-full">
                              {data.name}
                            </div>
                            <div className="lg:text-[0.8rem] text-[0.3rem] text-[#696969] w-full">
                              {data.postion}
                            </div>
                            <div className="lg:text-[0.8rem] text-[0.3rem] text-[#696969] w-full">
                              {data.email}
                            </div>
                          </div>
                        </div>
                        <div className="pl-3 no-scrollbar overflow-y-auto">
                          {/* {data.qualification && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                Qualification
                              </h1>
                              <ul className="list-disc py-2">
                                {data.qualification.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem] leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                          {/* {data.responsibility && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                Responsibilities held
                              </h1>
                              <ul className="list-disc py-2">
                                {data.responsibility.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem] leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                          {/* {data.indusexp && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                Industrial Experience
                              </h1>
                              <ul className="list-disc py-2">
                                {data.indusexp.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem]  leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                          {/* {data.projects && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                Projects
                              </h1>
                              <ul className="list-disc py-2">
                                {data.projects.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem]  leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}

                          {/* {data.liofpub && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                List of Publications
                              </h1>
                              <ul className="list-disc py-2">
                                {data.liofpub.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem]  leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                          {/* {data.achieve && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                Achievements
                              </h1>
                              <ul className="list-disc py-2">
                                {data.achieve.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem]  leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                          {/* {data.course && (
                            <div>
                              {" "}
                              <h1 className="lg:text-[1.25rem] text-[0.65rem]">
                                Recently taught Courses
                              </h1>
                              <ul className="list-disc py-2">
                                {data.course.map((item, index) => (
                                  <li
                                    className="lg:text-[0.8rem] text-[0.3rem]  leading-8 text-[#696969]"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
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

function Student({ title, item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dept, setDept] = useState("BTech");
  const [flex, setFlex] = useState(true);

  const toggleDept = (deptName) => {
    setDept(deptName);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Extract unique years from items
  const years = [...new Set(item.map((student) => student.year))].sort(
    (a, b) => {
      const [startA] = a.split("-").map(Number);
      const [startB] = b.split("-").map(Number);
      return startB - startA;
    },
  );

  const [selectedYear, setSelectedYear] = useState(years[0] || "");

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  // Get unique departments
  const departments = [...new Set(item.map((student) => student.dept))];

  // Filter students based on selected department and year
  const filteredStudents = item.filter(
    (student) => student.year === selectedYear && student.dept === dept,
  );

  return (
    <div className="w-screen flex justify-center overflow-hidden">
      <div
        className={`group w-[90%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3 ${
          isExpanded ? "mb-5 mt-5" : ""
        }`}
      >
        <div className="flex justify-between">
          <div
            onClick={toggleExpand}
            className={`group font-bold transition-all duration-700 flex lg:text-2xl text-lg pl-5 ${
              isExpanded ? "text-black" : "text-[#696969]"
            } cursor-pointer`}
          >
            <FaSquareFull
              className={`translate-y-[19px] duration-700 transition-all group-hover:text-[5px] group-hover:mr-2 ${
                isExpanded
                  ? "text-[5px] mr-2 text-black"
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
          className={`transition-all duration-[1s] h-auto ${
            isExpanded ? "opacity-100" : "opacity-0 max-h-0"
          }`}
        >
          <div className="flex pl-5 gap-3 pt-3">
            {departments.map((deptName, index) => (
              <div
                key={index}
                onClick={() => toggleDept(deptName)}
                className="group/dept flex cursor-pointer"
              >
                <FaSquareFull
                  className={`transition-all duration-500 translate-y-[13.5px] group-hover/dept:text-[3px] text-[0px] ${
                    dept === deptName
                      ? "text-[3px] text-black"
                      : "text-[0px] text-[#696969]"
                  } `}
                />
                <div
                  className={`transition-all duration-500 group-hover/dept:ml-2 ${
                    dept === deptName
                      ? "ml-2 text-black"
                      : "ml-0 text-[#696969]"
                  } `}
                >
                  {deptName}
                </div>
              </div>
            ))}
          </div>

          <div className="pb-2 pt-2 pl-5 pr-8 flex text-[#696969] items-center">
            Year
            <div>
              <div
                onClick={toggleOpen}
                className="relative flex items-center group/year px-3 text-[#696969] cursor-pointer"
              >
                {selectedYear}
                <div
                  onClick={toggleOpen}
                  className={`transition-transform opacity-0 group-hover/year:opacity-100 cursor-pointer ${
                    isOpen ? "rotate-180 opacity-100 " : ""
                  } duration-500 ease-in-out z-10`}
                >
                  <MdKeyboardArrowDown className="w-10 h-8 text-[#9E9E9E]" />
                </div>
                Batch
              </div>
              <div className="relative">
                <div
                  className={`absolute transition-all duration-500 h-auto overflow-hidden ${
                    isOpen ? "opacity-100" : "opacity-0 max-h-0"
                  }`}
                >
                  {years.map((year, index) => (
                    <div
                      onClick={() => handleYearChange(year)}
                      key={index}
                      className="px-2 bg-[#E9E9E8] text-[#696969] cursor-pointer"
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-5 gap-3 pb-3">
            <img src="./images/row.svg" onClick={() => setFlex(true)} alt="" />
            <div className="border-solid border-[1px] h-6 border-[#696969]"></div>
            <img src="./images/col.svg" onClick={() => setFlex(false)} alt="" />
          </div>
          <div className="flex pb-3">
            <div
              className={`no-scrollbar flex ${
                flex ? "flex-row flex-wrap" : "flex-col"
              } flex-initial overflow-auto min-h-max h-auto justify-between w-full gap-3 px-5`}
            >
              {filteredStudents.map((student, key) => (
                <div className="leading-9 pt-1" key={key}>
                  <div className="text-[54px] h-max w-max text-[#696969] flex gap-1 items-end translate-y-10">
                    <div className="w-2 h-2 bg-[#696969]"></div>
                    {student.name}
                  </div>
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
      email: "swarajkp@gmail.com",
      qualification: [
        "Ph. D in Computer Science & Engineering, University of Kerala",
        " M. Tech. in Computer Science, National Institute of Technology (NIT),Tiruchirappalli, Tamilnadu",
        "B. Tech. in Computer Science & Engineering,TKM College of Engineering Kollam ( University of Kerala)",
      ],
      responsibility: [
        "PSC interview Board member",
        "Chairman kerala university",
        "Chairman-Kerala Technological University",
      ],
      indusexp: [
        "1999-till date teaching experience (20 years of teaching experience)",
      ],
      projects: ["Mtech Projects"],
      liofpub: [
        " Sabitha S and Dr. M.P Sebastian, “GOS-AODV: A Gossip based Sleep Ad Hoc On Demand Distance Vector Routing Protocol”, Proc. Sixth IASTED International Conference on Communication Systems & Networks, Spain , August 2007, PP 13-18.",
        '  Sabitha, S., and M. S. Rajasree. "Anonymous-cpabe: Privacy preserved content disclosure for data sharing in cloud." In International Conference on Architecture of Computing Systems, pp. 146-157. Springer International Publishing, 2015.',
        '  Poison, Deepa Maria, S. Sabitha, and M. S. Rajasree. "Fine grained key computation scheme for secure data sharing in cloud." In Advances in Computing, Communications and Informatics (ICACCI), 2016 International Conference on, pp. 1110-1116. IEEE, 2016.',
        "  S. Sabitha, M. S. Rajasree: Access control based privacy preserving secure data sharing with hidden access policies in cloud. Journal of Systems Architecture - Embedded Systems Design, Elsevier, 75: 50-58 (2017)",
        '  Anju Mohandas and Sabitha S. "Privacy preserving content disclosure for enabling sharing of electronic health records in cloud computing." Proceedings of the 7th ACM India Computing Conference. ACM, 2014, pp 1-7.',
        "  Praveen Kumar and Sabitha S. “ User Authentication using visual cryptography”, Proc. IEEE ICCC 2015",
        "  Reenu Sara George and Sabitha S, “Survey on data integrity in cloud computing”, International Journal of Advanced Research in Computer Engineering & Technology (IJARCET),Volume 2, Issue 1,pp. 123-125, January 2013.",
      ],
      course: [
        "Database Technology",
        "Machine Learning",
        "Database Management Systems",
        "Data Mining and Warehousing",
      ],
    },
    {
      name: "Swaraj K P",
      postion: "Associate Professor",
      link: "/images/card.jpeg",
      year: "2022-23",
      email: "savitha@gmail.com",
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
      dept: "BTech",
    },
    {
      name: "Aleena O K",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Nandana A S",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Nandana V S",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Bimal Devasia",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Devadarsh M R",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Aswathy Krishna",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Yamuna Jayakumar",
      year: "2023-24",
      dept: "BTech",
    },
    {
      name: "Agnes Davies",
      year: "2023-24",
      dept: "MTech",
    },
    {
      name: "Jubuhan TT",
      year: "2023-24",
      dept: "MTech",
    },
    {
      name: "Vivek PS",
      year: "2023-24",
      dept: "MTech",
    },
    {
      name: "Amal Joseph",
      year: "2023-24",
      dept: "MTech",
    },
    {
      name: "Amal Joseph",
      year: "2023-24",
      dept: "PhD",
    },
    {
      name: "Sabari Kannan KR",
      year: "2023-24",
      dept: "PhD",
    },
    {
      name: "Almir Rimon MP",
      year: "2023-24",
      dept: "PhD",
    },
    {
      name: "Devadarsh M R",
      year: "2023-24",
      dept: "PhD",
    },
  ];

  return (
    <div className="flex flex-col    overflow-hidden min-h-[400px]  mt-[15rem] ">
      <div className="w-min ">
        {/* <ExpandableCards title="TEACHING STAFFS" item={FACULTYDATA} /> */}
        {/* <ExpandableCards title="TECHNICAL STAFFS" item={TECHSTAFF} /> */}
        <ExpandableCards title="ASSOCIATION MEMBER" item={item1} />
        <Student title="STUDENTS" item={studitem} />
        <Student title="ALUMNI" item={studitem} />
      </div>
    </div>
  );
}

export default cardpeople;
