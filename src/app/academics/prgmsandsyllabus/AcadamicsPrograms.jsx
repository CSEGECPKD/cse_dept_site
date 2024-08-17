"use client";

import React, { useRef } from "react";
import useBoundingclientrect from "@rooks/use-boundingclientrect";
import Image from "next/image";
import { AcadamicsLabsDataForCard } from "@/constants/contents";
import ColoredSection from "../../../components/ColoredSection";

const AcadamicsPrograms = () => {
  const ref = useRef(null);
  const boundingClientRect = useBoundingclientrect(ref);
  
  return (
    <ColoredSection color="WHITE" className="bg-black w-full">
      <div className="lg:sticky">
        <div className="brightness-50 hidden lg:sticky lg:inset-0 lg:block">
          <Image
            src="/bg-acadamic.jpeg"
            alt="department pic"
            className="object-fill"
            width={1920}
            height={1920}
          />
        </div>
        
        <div className="lg:px-24 py-20 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[67%_33%] lg:gap-3 container mx-auto relative ">
            <div
              className="p-20 space-y-1 lg:sticky lg:bottom-10 lg:top-36  mb-4"
              style={{
                minHeight: "auto",
                height: "fit-content",
              }}
            >
              <h2 className="text-[24px] md:text-[36px] lg:text-5xl font-normal font-bebasneue leading-[28.8px]">
                LABS AND OTHER FACILITIES
              </h2>
              <p className="font-montserrat text-[15px]  text-left lg:text-[21px] xl:text-[24px]/[40px] lg:pr-20 md:text-[20px]">
                The Department of Computer Science & Engineering (CSE) offers a
                comprehensive range of programs designed to equip students with
                the knowledge and skills necessary to thrive in the
                ever-evolving field of computer science.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end ">
              <div className="space-y-8 lg:space-y-[113px]">
                {AcadamicsLabsDataForCard.map((item, i) => (
                  <div
                    ref={i === 6 ? ref : undefined}
                    key={i}
                    className="h-[813.83px] w-[390px] "
                  >
                    <div>
                      <img
                        className="w-[390px] h-[525.83px] flex justify-center items-center"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <button className="font-normal font-montserrat text-[12.34px] lg:text-[20px]/[24.38px] bg-[#FFFFFF26] text-center p-[10px] mt-6">
                      SYLLABUS (2015 SCHEME)
                    </button>
                    <br/>
                    <button className="font-normal font-montserrat text-[12.34px] lg:text-[20px]/[24.38px] bg-[#FFFFFF26] text-center p-[10px] mt-6">
                      SYLLABUS (2019 SCHEME)
                    </button>
                    <h2 className="font-medium font-montserrat text-[20px]/[24.38px] mt-6">
                      {item.title}
                    </h2>
                    <p className="font-normal font-montserrat text-[16px]/[19.5px] mt-6">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
};

export default AcadamicsPrograms;