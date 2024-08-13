"use client";

import React, { useRef } from "react";
import useBoundingclientrect from "@rooks/use-boundingclientrect";
import Image from "next/image";
import { AcadamicsLabsDataForCard } from "@/constants/contents";
import ColoredSection from "../../../components/ColoredSection";

// {title,description,image,color}

const AcadamicsPrograms = () => {
  const ref = useRef(null);
  const boundingClientRect = useBoundingclientrect(ref);
  return (
    <ColoredSection color="WHITE" className=" bg-black">
      <div className="sticky ">
        <div className="sticky inset-0 brightness-50">
          <Image
            src="/bg-acadamic.jpeg"
            alt="department pic"
            className="object-fill"
            width={1920}
            height={1920}

          />
        </div>

        <div className="px-6 py-32 text-white">
          <div className="grid grid-cols-[67%_33%] gap-3 container mx-auto  relative z-">
            <div
              className="space-y-4  bottom-10 sticky top-40 z-10"
              style={{
                minHeight: boundingClientRect?.height ?? "fit-content",
                height: "fit-content",
              }}
            >
              <h2 className="text-5.5xl lg:text-5xl font-normal font-bebasneue leading-tight ">
                LABS AND OTHER FACILITIES
              </h2>
              <p className="font-montserrat text-[24px]/[40px] leading-10 ">
                The Department of Computer Science & Engineering (CSE) offers a
                comprehensive range of programs designed to equip students with
                the knowledge and skills necessary to thrive in the
                ever-evolving field of computer science.
              </p>
            </div>
            <div className="flex justify-end z-10">
              <div className="space-y-[113px]">
                {AcadamicsLabsDataForCard.map((item, i) => (
                  <div
                    ref={i === 6 ? ref : undefined}
                    key={i}
                    className="min-h-[813.83px] w-[390px] pl-16"
                  >
                    <div>
                      <img
                        className="w-[390px] h-[525.83px] flex justify-center items-center z-1"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <button className="font-normal font-montserrat text-[20px]/[24.38px] bg-[#FFFFFF26] text-center p-[10px] mt-6">
                      SYLLABUS (2015 SCHEME)
                    </button>
                    <button className="font-normal font-montserrat text-[20px]/[24.38px] bg-[#FFFFFF26] text-center p-[10px] mt-6">
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
