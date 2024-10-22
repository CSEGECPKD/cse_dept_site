"use client";
import React from "react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa6";

const ExpandableCards = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full sm:w-screen flex justify-center overflow-hidden">
      <div
        onClick={toggleExpand}
        className={`w-full sm:w-[85%] flex flex-col justify-center transition-all duration-[1s] ease-in-out bg-[#E9E9E8] p-3 ${
          isExpanded ? "mb-5" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <div
            className={`font-bold transition-all duration-700 flex items-center group-hover:text-black group-hover:text-xl sm:group-hover:text-2xl pl-2 sm:pl-5 ${
              isExpanded ? "text-black text-xl sm:text-2xl" : "text-[#696969]"
            } cursor-pointer`}
            style={{
              fontFamily: "Bebas Neue",
              fontWeight: 400,
              lineHeight: "1.2",
              textAlign: "center",
            }}
          >
            <FaSquareFull
              className={`translate-y-1 sm:translate-y-[19px] duration-1000 transition-all ${
                isExpanded
                  ? "text-[3px] sm:text-[5px] mr-1 sm:mr-2"
                  : "text-[0px] mr-0 text-[#696969]"
              }`}
            />
            <span className="text-2xl sm:text-[56px]">{title}</span>
          </div>
          <div
            onClick={toggleExpand}
            className={`transition-transform opacity-0 group-hover:opacity-100 cursor-pointer ${
              isExpanded ? "rotate-180 opacity-100" : ""
            } duration-[1s] ease-in-out z-10`}
          >
            <MdKeyboardArrowDown className="w-6 h-6 sm:w-10 sm:h-8 text-[#9E9E9E]" />
          </div>
        </div>
        <div
          className={`transition-all duration-[1s] h-auto overflow-hidden ${
            isExpanded ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          } px-2 sm:px-5`}
        >
          <div className="pb-2 pl-2 sm:pl-5 text-sm sm:text-base">
            BTech &nbsp; Mtech &nbsp; Phd
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="pb-2 pl-2 sm:pl-5 text-[#696969] text-sm sm:text-base">
              Year &nbsp; 2027 &nbsp; Batch
            </div>
            <button className="w-full sm:w-[151.19px] h-[38px] py-2 px-4 text-white bg-[#696969] text-sm sm:text-base mt-2 sm:mt-0">
              Download
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full mt-5 border-black border-[1px] text-[#696969] text-sm sm:text-base">
              <thead className="bg-[#E9E9E8]">
                <tr>
                  <th className="p-2">SI NO</th>
                  <th className="p-2">COMPANY NAME</th>
                  <th className="p-2">NUMBER OF OFFER</th>
                </tr>
              </thead>
              <tbody className="text-[#696969] text-center">
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Company A</td>
                  <td className="p-2">5</td>
                </tr>
                <tr>
                  <td className="p-2">2</td>
                  <td className="p-2">Company B</td>
                  <td className="p-2">10</td>
                </tr>
                <tr>
                  <td className="p-2">3</td>
                  <td className="p-2">Company C</td>
                  <td className="p-2">8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function PlacementStatus() {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full sm:w-min">
        <ExpandableCards title="COMPANY WISE PLACEMENT" />
        <ExpandableCards title="STUDENTS WISE PLACEMENT" />
        <ExpandableCards title="STARTUPS/ENTREPRENEURSHIP" />
      </div>
    </div>
  );
}

export default PlacementStatus;
