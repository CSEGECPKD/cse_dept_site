"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
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
      <footer className="container lg:mx-40 flex flex-col sm:flex-row justify-between px-14 sm:px-0 py-8 pb-12 bg-white text-gray-800 w-auto font-bebasneue relative">
        <div className="flex-1 mb-4 sm:mb-0">
          <form className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-[#BDBDBD]">
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
            <button className="inline-flex items-center group bg-black hover:bg-white text-white hover:text-black text-md border-2 border-black p-1 mt-4 transition-all duration-300 ease-in-out transform hover:pr-3">
              SEND
              <span className="inline-flex items-center justify-center ml-1 w-auto h-auto transform group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                <MdOutlineArrowOutward className="group-hover:hidden text-white transition-all duration-300 ease-in-out" />
                <FaArrowRightLong className="hidden group-hover:inline-flex text-black transition-all duration-300 ease-in-out" />
              </span>
            </button>
          </form>
          <p className="text-[#656565] hidden sm:block">
            © {currentYear} CSE ASSOCIATION
          </p>
        </div>

        <div className="relative isolate">
          <h3 className="text-xl font-semibold mb-2 text-[#BDBDBD] sm:px-5">
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
                  className="text-16 block text-[#656565] min-w-[7.5rem] mb-1 ml-2"
                  href="#"
                >
                  {link}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row  sm:items-center mt-8">
            <p className="text-[#656565] block sm:hidden">
              © {currentYear} CSE ASSOCIATION
            </p>
            <div className="flex items-center justify-between mt-2.5 w-full sm:absolute bottom-0">
              <p className="text-[#656565]">
                DESIGN AND POWERED BY{" "}
                <Link
                  className="underline font-bold hover:text-blue-500"
                  href="/developers"
                >
                  CSE STUDENTS
                </Link>
              </p>
              <div className="flex items-center">
                <RiInstagramFill className="text-[#666666] w-5 h-5" />
                <IoLogoLinkedin className="text-[#666666] ml-2 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </ColoredSection>
  );
};

export default Footer;
