"use client";

import React, { useEffect } from "react";
import { studentsData } from "../../../constants/contents";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import "../../../app/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";

function StudentCard({ name, batch, sem, cgpa, image, index }) {
  return (
    <div>
      <div className="student-card h-[350px] w-auto">
        <div className="flex flex-row sm:flex-col bg-white justify-start items-center h-[156px] relative sm:h-auto w-auto sm:w-[220px]">
          <div className="stud-image w-[170px] h-[156px] sm:w-[220px] sm:h-[220px] transition-all duration-[1s]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="stud-details w-full h-auto text-center flex flex-col">
            <div className="sm:hidden  w-full h-auto flex flex-row justify-end">
              <p className=" w-[40px] flex p-1 justify-center items-center text-black hover:bg-[#9E9E9E] hover:text-white transition-all duration-300">
                <HiArrowLeft size={22} />
              </p>
              <p className=" w-[40px] flex p-1 justify-center items-center text-black hover:bg-[#9E9E9E] hover:text-white transition-all duration-300">
                <HiArrowRight size={22} />
              </p>
            </div>

            <p className="text-black text-base font-semibold ">{name}</p>
            <p className="text-gray-500  text-sm">{batch} Batch</p>
            <p className="text-gray-500 text-sm">CGPA {cgpa}</p>
            <p className="text-white font-semibold text-sm w-full bg-[#DD846E] py-[4px] mt-3 sm:mt-0 md:mt-0 lg:mt-0">
              {sem} TOPPER
            </p>
          </div>
        </div>
        <div className="w-[220px] h-2 hidden sm:block ">
          <div className="arrow-buttons h-[31px] bg-white flex flex-1 items-center justify-center">
            <p className=" w-full flex py-1 justify-center items-center text-black hover:bg-[#9E9E9E] hover:text-white transition-all ">
              <HiArrowLeft size={22} />
            </p>
            <p className=" w-full flex py-1 justify-center items-center text-black hover:bg-[#9E9E9E] hover:text-white transition-all ">
              <HiArrowRight size={22} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Acheivers = () => {
  return (
    <div className="container mx-auto bg-white py-20 px-4 sm:px-6 h-full">
      <div className=" bg-[#e9e9e8] w-full h-full p-4 sm:p-6">
        <div className="flex justify-start w-full h-full">
          <h1 className="text-black font-bold font-bebasneue lg:text-5xl text-4xl ">
            . ACHEIVERS
          </h1>
        </div>

        <div className="pt-3 grid max-w-full mx-auto lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-4 md:gap-8 lg:gap-10 justify-items-center">
          {studentsData.map((student, index) => (
            <StudentCard key={index} {...student} index={index} />
          ))}
        </div>
        <div className="text-center px-4 ">
          <p className="text-white font-semibold text-center text-base  w-full bg-[#DD846E] py-[5px]">
            LOAD MORE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Acheivers;
