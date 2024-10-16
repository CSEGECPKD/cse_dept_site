"use client";

import React, { useState, useEffect } from "react";
import { hodData } from "../constants/contents";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

import ColoredSection from "./ColoredSection";

const HodMessage = () => {
  const hod = hodData[0];

  return (
    <ColoredSection color="BLACK" className="mb-36">
      <div className="bg-white container mx-auto py-20 px-4 h-full md:h-[70vh]">
        <div className="w-full h-auto text-right">
          <h1 className="text-black w-auto h-auto text-4xl lg:text-5xl font-semibold font-bebasneue">
            . HOD MESSAGE
          </h1>
        </div>
        <div className="grid md:grid-cols-[330px_auto] grid-cols-1 gap-[8px] md:gap-[70px] md:flex-row md:justify-between w-full h-auto md:p-5 md:pl-0 xl:p-10 xl:pl-0">
          {/* Image of hod and its desigination */}
          <div className=" w-full pt-5 md:pt-0  grid grid-cols-2 md:grid-cols-1">
            <div className="w-full">
              <img
                src={hod.image}
                alt="HOD Image"
                layout="responsive"
                className="w-full  object-cover transition duration-300 ease-in-out "
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="mt-2 text-base lg:text-xl font-normal w-auto h-auto ">
                {hod.name}
              </p>
              <p className="text-gray-500 text-[15px] w-auto h-auto">
                {hod.designation}
              </p>
            </div>
          </div>
          {/* message of hod */}
          <div className="flex-auto justify-start w-full  pt-5 md:pt-0 md:pl-5">
            <p className="text-gray-500 text-[16px] sm:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[30px] lg:leading-[185%] transition duration-300 ease-in-out">
              {hod.message}
            </p>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
};

export default HodMessage;
