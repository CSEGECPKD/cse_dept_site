import React, { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaArrowRightLong } from "react-icons/fa6";
import { navbarAtom } from "@/atoms/navbarAtom";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

function NavbarItem({
  href,
  label,
  setNavbar,
  showArrow,
  hasDropdown,
  dropdownItems,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWhite, setIsWhite] = useAtom(navbarAtom);
  const color = isWhite === "WHITE" ? "text-white" : "text-black";

  return (
    <li
      className="relative md:pb-5 text-[16px] my-8 md:my-0 md:px-6 text-left border-b-2 md:border-b-0 md:hover:bg-transparent hover:scale-x-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={twMerge("flex items-center justify-between w-full", color)}
      >
        {isHovered && (
          <div className="dot w-2 h-2 absolute top-3 left-1 lg:bg-white rounded"></div>
        )}
        <Link
          href={href}
          onClick={() => setNavbar(false)}
          className="flex-grow"
        >
          {label}
        </Link>
        {hasDropdown && <FaChevronDown className="ml-2" />}
        {showArrow && !hasDropdown && (
          <FaArrowRightLong className="ml-2 block md:hidden" />
        )}
      </div>
      {isHovered && hasDropdown && dropdownItems && (
        <ul
          style={{
            background: "rgba(255, 255, 255, 0.10)",
            backdropFilter: "blur(30px)",
          }}
          className={`md:absolute left-0 mt-2 md:ml-0 py-2 shadow-lg w-full md:w-52 ${
            isHovered ? "block" : "hidden"
          } md:block`}
        >
          {dropdownItems.map((item, index) => (
            <li
              key={index}
              className="py-2 px-4 md:px-2 hover:bg-slate-500 hover:bg-opacity-10 hover:scale-95"
            >
              <Link href={item.href} onClick={() => setNavbar(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavbarItem;
