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
  const color = isWhite === "WHITE" ? "mdlg:text-white" : "mdlg:text-black";
  const bg = isWhite === "WHITE" ? "mdlg:bg-white" : "mdlg:bg-black";
  const blurBg = isWhite === "WHITE" ? "bg-white/10" : "bg-black/10";
  const arrow =
    isWhite === "WHITE" ? "down-arrow-white.png" : "down-arrow-black.png";

  return (
    <li
      className="relative h-full text-left border-b-2 mdlg:border-b-0 mdlg:hover:bg-transparent font-bebasneue"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={twMerge(
          "flex items-center gap-[6px] justify-between w-fit mdlg:py-5 text-[16px] my-8 mdlg:my-0 mdlg:px-6 text-black relative group/main h-full",
          color
        )}
      >
        {hasDropdown ? (
          <img
            className="shrink-0 opacity-0 group-hover/main:opacity-100 transition-transform hidden mdlg:block"
            src={arrow}
            alt="expand-links"
          />
        ) : (
          <div
            className={twMerge(
              "h-[6px] w-[6px] shrink-0  opacity-0 group-hover/main:opacity-100 transition-transform hidden mdlg:block",
              bg
            )}
          ></div>
        )}
        <Link
          href={href}
          onClick={() => setNavbar(false)}
          className="flex-grow shrink-0 tracking-link"
        >
          {label}
        </Link>

        {hasDropdown && dropdownItems && (
          <ul
            className={twMerge(
              `mdlg:absolute left-0 mt-2 mdlg:ml-0  w-full mdlg:w-52 mdlg:hidden top-[100%] group-hover/main:block backdrop-blur-[32px]`,
              blurBg
            )}
          >
            {dropdownItems.map((item, index) => (
              <li
                key={index}
                className={twMerge(
                  "flex gap-[6px] items-center py-3 px-4 mdlg:px-2 transition-all group/sub",
                  color
                )}
              >
                <div
                  className={twMerge(
                    "h-[6px] w-[6px] ml-2 shrink-0 opacity-0  group-hover/sub:opacity-100",
                    bg
                  )}
                ></div>
                <Link
                  className="tracking-link"
                  href={item.href}
                  onClick={() => setNavbar(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default NavbarItem;
