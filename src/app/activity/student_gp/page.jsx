"use client";
import React, { useState } from "react";
import { data } from "./content";
import Image from "next/image";

export default function Student() {
  return (
    <div>
      <div className="bg-[#e9e8e9]">
        <div className="container mx-auto w-full h-[350px] flex justify-start items-end pb-8">
          <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
          <h1 className="uppercase text-[48px] font-bold">Student groups</h1>
        </div>
      </div>
      {data.map((item, index) => (
        <HoverableItem key={index} item={item} />
      ))}
    </div>
  );
}

function HoverableItem({ item }) {
  const [isHover, setHover] = useState(false);

  return (
    <div
      className="container mx-auto flex flex-row space-x-10 pt-20"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="bg-slate-500 relative w-full h-full">
        <Image
          src={item.img}
          alt={item.head}
          width={800}
          height={400}
          className={`${
            isHover ? "" : "grayscale"
          } transition-all duration-300`}
        />
      </div>
      <div>
        <div className="flex mb-5 mt-5 justify-start flex-row items-end">
          <span
            className={`dot w-1 h-1 bg-black mb-2 ${
              isHover ? "block" : "hidden"
            } transition-opacity duration-400`}
          ></span>
          <h1
            className={`text-2xl ${
              isHover ? "translate-x-3" : ""
            } transition-transform duration-300`}
          >
            {item.head}
          </h1>
        </div>
        <p
          className={`${
            isHover ? "text-[#dc856e]" : "text-[#000000]"
          } transition-colors duration-300 text-[20px]`}
        >
          {item.content}
        </p>
        <button
          className={`p-2 ${
            isHover ? "bg-[#dc856e]" : "bg-[#696969]"
          } text-center border hover:border-[#dc856e] hover:bg-[#ffffff] hover:text-[#dc856e] mt-8 text-white transition-all duration-300`}
        >
          {item.btn}
        </button>
      </div>
    </div>
  );
}
