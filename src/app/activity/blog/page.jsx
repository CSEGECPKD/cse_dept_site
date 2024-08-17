"use client";
import React, { useState } from "react";
import { data } from "./content";
import Image from "next/image";

export default function Blog() {
  return (
    <div>
      <div className="bg-[#e9e8e9]">
        <div className="container mx-auto w-full h-[350px] flex justify-start items-end pb-8">
          <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
          <h1 className="uppercase text-[48px] font-bold">Blogs</h1>
        </div>
      </div>
      {data.map((item, index) => (
        <HoverableItem key={index} item={item} />
      ))}
    </div>
  );
}
const blogContnet=()=>{
    setisClick(true)
}

function HoverableItem({ item }) {
  const [isHover, setHover] = useState(false);
  // const [isClick, setisClick] =useState(false)

  return (
    <div>
      <div
        className="container mx-auto flex flex-row space-x-10 pt-20"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // onClick={blogContnet}
      >
        <div className="bg-slate-500 relative w-auto h-full">
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
          <div className="bg-black w-full border border-black mt-6"> </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-5 ">
              <div
                className={`text-2xl mt-3 w-10 h-10 ${
                  isHover ? "text-[#dc856e]" : "text-[#000000]"
                }`}
              >
                {React.cloneElement(item.icon, { className: "w-12 h-12" })}
              </div>
              <div className="mt-3">
                <h1>{item.name}</h1>
                <p
                  className={`${isHover ? "text-[#dc856e]" : "text-[#000000]"}`}
                >
                  {item.year}
                </p>
              </div>
            </div>
            <div
              className={`mt-10 ${
                isHover ? "text-[#dc856e]" : "text-[#000000]"
              }`}
            >
              {item.date}
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10 mx-48 border border-black" />
    </div>
  );
}
