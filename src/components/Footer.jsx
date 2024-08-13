"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
import ColoredSection from "./ColoredSection";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const squareBlock = (index) =>
    `w-3 h-3 bg-black hover:opacity-100 ${
      hoveredIndex === index ? "" : "bg-white"
    } mb-1.5`;
  return (
    <ColoredSection color="BLACK">
      <footer className="flex flex-col sm:flex-row justify-between px-24 py-8 bg-white text-gray-800 w-full font-bebasneue relative">
        <div className="flex-1 mb-4 sm:mb-0">
          <form className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">
              SEND YOUR MESSAGES
            </h3>
            {["YOUR NAME *", "YOUR MAIL *", "SUBJECT *", "MESSAGE *"].map(
              (placeholder, index) => (
                <div key={index} className="mb-2 max-w-md">
                  <input
                    className="p-2 border-b-2 border-gray-600 w-full bg-transparent outline-none"
                    type="text"
                    placeholder={placeholder}
                  />
                </div>
              )
            )}
            <button className="bg-black text-white p-2 flex items-center">
              SEND
              <MdOutlineArrowOutward className="ml-2 font-bold" />
            </button>
          </form>
          <p className="text-gray-600">© {currentYear} CSE ASSOCIATION</p>
        </div>

        <div className="relative isolate">
          <h3 className="text-xl font-semibold mb-2 text-gray-500 px-5">
            QUICK LINKS
          </h3>

          <div className="grid grid-cols-2 gap-x-[7.125rem]">
            {[
              "HOME",
              "PEOPLE",
              "PLACEMENTS",
              "ABOUT US",
              "ACTIVITIES",
              "CONTACT US",
            ].map((link, index) => (
              <div
                key={index}
                className="flex items-center"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={squareBlock(index)}></div>
                <Link
                  className="text-16 block text-gray-600 min-w-[7.5rem] mb-1 ml-2"
                  href="#"
                >
                  {link}
                </Link>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 w-[120%] flex items-center">
            <p className="text-gray-600">
              DESIGN AND POWERED BY{" "}
              <Link
                className="underline font-bold hover:text-blue-500"
                href="#"
              >
                CSE STUDENTS
              </Link>
            </p>
            <span className="ml-10 flex items-center ">
              <RiInstagramFill className="text-gray-600 w-5 h-5" />
              <IoLogoLinkedin className="text-gray-600 ml-2 w-5 h-5" />
            </span>
          </div>
        </div>
      </footer>
    </ColoredSection>
  );
};

export default Footer;
