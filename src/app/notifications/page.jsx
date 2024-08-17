import React from "react";
import Image from "next/image";
import ColoredSection from "../../components/ColoredSection";
import { data } from "./content.js";

const Notifications = () => {
  return (
    <ColoredSection
      color="WHITE"
      className=" grid grid-cols-[50%_50%] min-h-full"
    >
      <div className="bg-[#c5c8fd] relative">
        <div className="sticky top-0 h-screen block">
          <Image
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-contain"
            src="/notify.jpg"
            alt="Background"
            width={500}
            height={600}
          />
        </div>
        <h1 className="absolute bottom-0 font-bebasneue">.UPDATES</h1>
      </div>

      <div className=" bg-black text-white px-6 py-10">
        <div className="text-5xl px-20 py-24 gap-8">
          <h2 className="text-[32px] font-normal font-bebasneue leading-[50px] mb-16">
            Notifications
          </h2>
          <ol className="mt-6">
            {data.map((item, index) => (
              <li
                className="flex flex-row my-5 border-b-2 border-[#9E9E9E]"
                key={index}
              >
                <div className="pr-10 font-normal font-montserrat text-[20px]/[24.38px]">
                  [{item.num}]
                </div>
                <div class="list-item">
                  <div className="flex justify-between">
                    <div className="pr-10 font-normal font-montserrat text-[20px]/[24.38px]">
                      <h1>{item.head}</h1>
                      <h2>{item.date}</h2>
                    </div>
                    <button className="hover:scale-95 font-normal font-montserrat text-[20px] bg-[#FFFFFF26] text-center py-2 h-8 px-6 ">
                      {item.btn}
                    </button>
                  </div>
                  <p className="text-[16px]/[19.5px] text-[#9E9E9E] text-left font-montserrat font-normal my-5">
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
