"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import NavbarItem from "./NavbarItem/NavbarItem";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useAtom } from "jotai";
import { navbarAtom } from "@/atoms/navbarAtom";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { usePathname } from "next/navigation";

const navbarVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "-100%",
  },
};

const links = [
  {
    label: "Home",
    type: "main",
    href: "/",
  },
  {
    label: "About Us",
    type: "main",
    href: "/aboutus",
    node: [
      {
        label: "About Department",
        type: "sub-main",
        href: "/aboutus",
      },
      {
        label: "Mission & Vision",
        type: "sub-main",
        href: "/aboutus",
      },
      {
        label: "Course Offered",
        type: "sub-main",
        href: "/aboutus",
      },
      {
        label: "History of Dept",
        type: "sub-main",
        href: "/aboutus",
      },
      {
        label: "Advisory Board",
        type: "sub-main",
        href: "/aboutus",
      },
      {
        label: "Gallery",
        type: "sub-main",
        href: "/aboutus",
      },
    ],
  },
  {
    label: "Academics",
    type: "main",
    href: "/academics",
    node: [
      {
        label: "PO, PsO and PEO",
        type: "sub-main",
        href: "/academics",
      },
      {
        label: "Programmes and Syllabus",
        type: "sub-main",
        href: "/academics",
      },
      {
        label: "Courses",
        type: "sub-main",
        href: "/academics",
      },
      {
        label: "Labs",
        type: "sub-main",
        href: "/academics",
      },
      {
        label: "Library",
        type: "sub-main",
        href: "/academics",
      },
    ],
  },
  {
    label: "People",
    type: "main",
    href: "/people",
    node: [
      {
        label: "Teaching Staffs",
        type: "sub-main",
        href: "/people",
      },
      {
        label: "Technical Staffs",
        type: "sub-main",
        href: "/people",
      },
      {
        label: "Association Members",
        type: "sub-main",
        href: "/people",
      },
      {
        label: "Students",
        type: "sub-main",
        href: "/people",
      },
      {
        label: "Alumni",
        type: "sub-main",
        href: "/people",
      },
    ],
  },
  {
    label: "Activities",
    type: "main",
    href: "/activity/events",
    node: [
      {
        label: "Events",
        type: "sub-main",
        href: "/activity/events",
      },
      {
        label: "Blogs",
        type: "sub-main",
        href: "/activity/blog",
      },
      {
        label: "Magazine/Newsletter",
        type: "sub-main",
        href: "/activity/magazine",
      },
      {
        label: "Students Group",
        type: "sub-main",
        href: "/activity/student_gp",
      },
    ],
  },
  {
    label: "Achievements",
    type: "main",
    href: "/achievement",
    node: [
      {
        label: "Achievements",
        type: "sub-main",
        href: "/achievement",
      },
      {
        label: "Placement",
        type: "sub-main",
        href: "/placements",
      },
    ],
  },
  {
    label: "Notifications",
    type: "main",
    href: "/notifications",
  },
];


function Navbar() {
  const [isWhite, setIsWhite] = useAtom(navbarAtom);
  const [open, setOpen] = useState(false);
  const [openedLabel, setOpenedLabel] = useState(null);
  const color = isWhite === "WHITE" && !open ? "text-white" : "text-black";
  const btnColor = isWhite === "WHITE" && !open ? "text-black" : "text-white";
  const logo = isWhite === "WHITE" && !open ? "/logo.png" : "/logo(black).png";
  const bgColor = isWhite === "WHITE" && !open ? "bg-white" : "bg-black";
  const bgBlur = isWhite === "WHITE" ? "bg-white/10" : "bg-black/10";

  return (
    <div className="z-10 fixed w-screen isolate">
      <div
        className={twMerge(
          "w-full lgmd:w-[90%] 2xl:w-[80%] max-w-[1400px]  lgmd:mt-[1.875rem]  mx-auto flex justify-between items-center  relative px-4 py-2 mdlg:py-0 font-bebasneue",
          !open && "before:backdrop-hack",
          open ? "bg-white" : bgBlur
        )}
      >
        <div className="flex justify-center items-end h-full gap-4">
          <img
            className="block w-[94px] -translate-y-[2px]"
            src={logo}
            alt="logo"
          />
          {!open && (
            <h1 className={twMerge("text-sm h-fit", color)}>
              COMPUTER SCIENCE <br /> AND ENGINEERING
            </h1>
          )}
        </div>
        <nav className="hidden mdlg:block" id="desktop-nav">
          <ul className="flex lgmd:gap-8 gap-4">
            {links.map((link) => (
              <li key={link.label}>
                <DesktopNavbarItem link={link} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="block mdlg:hidden" id="mobile-nav">
          <button
            className={twMerge(
              "p-2 font-montserrat outline-none",
              btnColor,
              bgColor
            )}
            onClick={() => {
              setOpenedLabel("");
              setOpen((prev) => !prev);
            }}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>
      <motion.div
        variants={navbarVariants}
        animate={open ? "open" : "closed"}
        initial="closed"
        transition={{
          ease: "linear",
        }}
        className="fixed w-screen top-0 left-0 h-screen overflow-auto  bg-white z-[-1] "
      >
        <nav className="flex flex-col justify-between  min-h-screen pt-20 px-5">
          <ul className="flex-1">
            {links.map((link) => (
              <li key={link.label}>
                <MobileNavbarItem
                  link={link}
                  setOpenedLabel={setOpenedLabel}
                  openedLabel={openedLabel}
                  setClose={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
          <div className="w-full flex items-end justify-between py-5 font-bebasneue text-gray-600">
            <div>
              <p>&copy;2024 CSE ASSOSIATION</p>
              <p className=" text-sm h-fit">
                DESIGN AND POWERED BY{" "}
                <Link
                  className="underline font-bold hover:text-blue-500"
                  href="#"
                >
                  CSE STUDENTS
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RiInstagramFill className="text-gray-600 w-5 h-5" />
              <IoLogoLinkedin className="text-gray-600 w-5 h-5" />
              <FaGithub className="text-gray-600 w-5 h-5" />
            </div>
          </div>
        </nav>
      </motion.div>
    </div>
  );
}

function DesktopNavbarItem({ link }) {
  const [isWhite, setIsWhite] = useAtom(navbarAtom);
  const color = isWhite === "WHITE" ? "text-white" : "text-black";
  const bgColor = isWhite === "WHITE" ? "bg-white" : "bg-black";
  const hasDropdown = !!link.node;
  const arrow =
    isWhite === "WHITE" ? "/down-arrow-white.png" : "/down-arrow-black.png";
  const pathname = usePathname();

  return (
    <div className={twMerge("group/main relative", color)}>
      <Link
        className="flex  items-center justify-center gap-1 px-2 py-6 "
        href={link.href}
      >
        {hasDropdown ? (
          link.href === pathname ? (
            <div
              className={twMerge(
                "h-[6px] w-[6px] ml-2 shrink-0 -translate-y-[2px]",
                bgColor
              )}
            ></div>
          ) : (
            <img
              className={twMerge(
                "shrink-0 opacity-0 group-hover/main:opacity-100 transition-transform block w-[15px] -translate-y-[2px]",
                link.href === pathname && "opacity-1"
              )}
              src={arrow}
              alt="expand-links"
            />
          )
        ) : (
          <div
            className={twMerge(
              "h-[6px] w-[6px] ml-2 shrink-0 opacity-0 -translate-y-[2px]  group-hover/main:opacity-100",
              bgColor,
              link.href === pathname && "opacity-1"
            )}
          ></div>
        )}

        <span className="uppercase">{link.label}</span>
      </Link>
      <ul
        className={twMerge(
          `absolute left-0 mt-2 ml-0   w-52 hidden top-[90%] group-hover/main:block backdrop-blur-[32px]`,
          "bg-black/10"
        )}
      >
        {hasDropdown &&
          link.node.map((item, index) => (
            <li
              key={index}
              className={twMerge(
                "flex gap-[6px] items-center py-3 px-2 transition-all group/sub",
                color
              )}
            >
              <div
                className={twMerge(
                  "h-[6px] w-[6px] ml-2 shrink-0 opacity-0  group-hover/sub:opacity-100 -translate-y-[2px]",
                  bgColor
                )}
              ></div>
              <Link className="tracking-link" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

function MobileNavbarItem({ link, openedLabel, setOpenedLabel, setClose }) {
  return (
    <div className="border-b border-[#696969]">
      <button
        onClick={() =>
          setOpenedLabel((prev) => (prev === link.label ? "" : link.label))
        }
        className="flex justify-between items-center w-full font-bebasneue text-[#656565] [-webkit-text-stroke-width:0.2] [-webkit-text-stroke-color:#FFF] py-4 "
      >
        <span>{link.label}</span>
        <FaArrowRightLong
          className={twMerge(
            "text-black transition-transform",
            openedLabel === link.label && link.node && "rotate-45"
          )}
        />
      </button>
      <AnimatePresence>
        {link.node && link.node.length > 0 && openedLabel === link.label && (
          <motion.ul
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="pl-5"
          >
            {link.node.map((link) => (
              <li
                className="border-b border-[#696969] last-of-type:border-none"
                key={link.label}
              >
                <Link
                  href={link.href}
                  onClick={() => {
                    setClose();
                  }}
                  className="flex justify-between items-center font-bebasneue text-[#656565] [-webkit-text-stroke-width:0.2] [-webkit-text-stroke-color:#FFF] py-2 "
                >
                  <span>{link.label}</span>
                  <FaArrowRightLong className="text-black" />
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Navbar;
