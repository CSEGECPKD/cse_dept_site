import React from "react";
import Image from "next/image";
import ColoredSection from "../../../components/ColoredSection";
import { data } from "./content.js";

const Notifications = () => {
  return (
    <ColoredSection
      color="WHITE"
      className="grid grid-cols-1 md:grid-cols-2 min-h-full"
    >
      <div className="bg-[#c5c8fd] relative">
        <div className="sticky top-0 h-screen block">
          <Image
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-contain"
            src="/notify.jpg"
            alt="Background"
            layout="fill"
          />
        </div>
      </div>

      <div className="bg-black text-white px-4 py-6 md:px-6 md:py-10">
        <div className="text-3xl md:text-5xl px-4 md:px-20 py-6 md:py-24 gap-4 md:gap-8">
          <h2 className="text-[24px] md:text-[32px] font-normal font-bebasneue leading-[36px] md:leading-[50px] mb-8 md:mb-16">
            Notifications
          </h2>
          <ol className="mt-4 md:mt-6">
            {data.map((item, index) => (
              <li
                className="flex flex-col md:flex-row my-4 md:my-5 border-b-2 border-[#9E9E9E]"
                key={index}
              >
                <div className="pr-0 md:pr-10 font-normal font-montserrat text-[16px] md:text-[20px]">
                  [{item.num}]
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="pr-0 md:pr-10 font-normal font-montserrat text-[16px] md:text-[20px]">
                      <h1>{item.head}</h1>
                      <h2>{item.date}</h2>
                    </div>
                    <button className="mt-2 md:mt-0 hover:scale-95 font-normal font-montserrat text-[16px] md:text-[20px] bg-[#FFFFFF26] text-center py-1 md:py-2 px-4 md:px-6">
                      {item.btn}
                    </button>
                  </div>
                  <p className="text-[14px] md:text-[16px] text-[#9E9E9E] text-left font-montserrat font-normal my-4 md:my-5">
                    {item.content}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ColoredSection>
  );
};

export default Notifications;
