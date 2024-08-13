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
    <ColoredSection color="BLACK">
      <div className="bg-white container mx-auto py-20 px-4 h-full md:h-[70vh]">
        <div className="w-full h-auto text-right">
          <h1 className="text-black w-auto h-auto text-4xl lg:text-5xl font-semibold font-bebasneue">
            . HOD MESSAGE
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full h-auto md:p-5 xl:p-10">
          {/* Image of hod and its desigination */}
          <div className="flex-auto w-full md:w-2/6 h-2/4 pt-5 md:pt-0 items-center justify-center ">
            <div className="w-full h-auto flex justify-center items-center">
              <img
                src={hod.image}
                alt="HOD Image"
                layout="responsive"
                className="w-[200px] h-[250px] xl:w-[260px] xl:h-[320px] object-cover transition duration-300 ease-in-out hover:scale-105 "
              />
            </div>
            <div className="w-full h-auto flex flex-col justify-center items-center">
              <p className="mt-2 text-base lg:text-xl font-normal w-auto h-auto ">
                {hod.name}
              </p>
              <p className="text-gray-500 text-[15px] w-auto h-auto">
                {hod.designation}
              </p>
            </div>
          </div>
          {/* message of hod */}
          <div className="flex-auto justify-start w-full md:w-4/6 h-2/4 pt-5 md:pt-0 md:pl-5">
            <p className="text-gray-500 text-[16px] sm:text-[17px] lg:text-[18px] xl:text-[22px] leading-[28px] md:leading-[30px] lg:leading-[40px] transition duration-300 ease-in-out hover:scale-105">
              {hod.message}
            </p>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
};

export default HodMessage;
