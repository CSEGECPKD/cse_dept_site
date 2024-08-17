"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { useAtom } from "jotai";
import { navbarAtom } from "@/atoms/navbarAtom";
import { twMerge } from "tailwind-merge";

const peopleDropdownItems = [
  { label: "Teaching Staffs", href: "#teaching-staffs" },
  { label: "Technical Staffs", href: "#technical-staffs" },
  { label: "Association Member", href: "#association-member" },
  { label: "Students", href: "#students" },
  { label: "Alumni", href: "#alumni" },
];

const activitiesDrop = [
  { label: "Blog", href: "/activity/blog" },
  { label: "Events", href: "/activity/events" },
  { label: "Magazine/Newsletter", href: "/activity/magazin" },
  { label: "Students Group", href: "/activity/student_gp" },
];

const academicsDropdownItems = [
  { label: "PO, PsO and PEO", href: "/academics/posandpeo" },
  { label: "Programmes and Syllabus", href: "/academics/prgmsandsyllabus" },
  { label: "Courses", href: "/academics/courses" },
  { label: "Labs", href: "/academics/labs" },
  { label: "Library", href: "/academics/librarys" },
];
const placementDropdowns = [
  { label: "Achievement", href: "/achievement" },
  { label: "Placement", href: "/placements" },
];

function Navbar() {
  const [isWhite, setIsWhite] = useAtom(navbarAtom);
  const [open, setOpen] = useState(false);
  const color = isWhite === "WHITE" ? "text-white" : "text-black";
  const logo = isWhite === "WHITE" ? "/logo.png" : "/logo(black).png";
  const bg =
    isWhite === "WHITE" ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.10)";
  const toggleNavbar = () => {
    setOpen(!open);
  };

  return (
    <nav
      style={
        open
          ? { background: "white" }
          : {
              background: bg,
              // backdropFilter: "blur(32px)",
            }
      }
      className={twMerge(
        "md:flex items-center lgmd:mt-8 2xl:w-[80%] lgmd:w-[90%]  w-full max-w-[1200px] mx-auto font-bold fixed top-0 left-0 right-0 z-10 h-20 md:before:backdrop-hack",
        !open && "before:backdrop-hack"
      )}
    >
      <div className="flex items-center justify-between w-full py-3 px-4 md:px-2 h-20 mx-auto">
        <div className="flex gap-4 items-center md:mr-14">
          <Image
            src={open ? "/logo(black).png" : logo}
            alt="Logo image"
            width={80}
            height={60}
            className="w-24 h-14 mb-3"
          />
          <p
            className={twMerge(
              "text-sm text-left mt-2 text-black",
              open ? "hidden md:block" : "block",
              color
            )}
          >
            COMPUTER SCIENCE <br /> AND ENGINEERING
          </p>
        </div>
        <div className="mdlg:hidden">
          <button
            className="p-2 rounded-md outline-none"
            onClick={toggleNavbar}
          >
            {open ? (
              <div className="p-2 text-white bg-black w-16 h-10 flex justify-center text-center">
                <h1 className="text-[16px]">CLOSE</h1>
              </div>
            ) : (
              <div className="p-2 text-black bg-white w-16 h-10 flex justify-center text-center">
                <h1 className="text-[16px]">MENU</h1>
              </div>
            )}
          </button>
        </div>
      </div>
      <div
        className={twMerge(
          `fixed top-20 h-screen p-3 px-6 left-0 right-0 bg-white text-black transition-transform duration-1000 ease-in-out mdlg:relative md:top-0 md:bg-transparent mdlg:translate-x-0 mdlg:flex  mdlg:p-0 mdlg:h-auto mdlg:pb-0 mdlg:mt-0 `,
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ul className="items  items-center justify-center mdlg:flex mdlg:mr-8 ">
          <NavbarItem
            href="/"
            label="HOME"
            setNavbar={setOpen}
            showArrow={open}
          />
          <NavbarItem
            href="/aboutus"
            label="ABOUT US"
            setNavbar={setOpen}
            showArrow={open}
          />
          <NavbarItem
            href="/academics"
            label="ACADEMICS"
            setNavbar={setOpen}
            showArrow={open}
            hasDropdown={true}
            dropdownItems={academicsDropdownItems}
          />
          <NavbarItem
            href="/people"
            label="PEOPLE"
            setNavbar={setOpen}
            showArrow={open}
            hasDropdown={true}
            dropdownItems={peopleDropdownItems}
          />
          <NavbarItem
            href="/activity"
            label="ACTIVITIES"
            setNavbar={setOpen}
            showArrow={open}
            hasDropdown={true}
            dropdownItems={activitiesDrop}
          />
          <NavbarItem
            href="/placements"
            label="PLACEMENTS"
            setNavbar={setOpen}
            showArrow={open}
            hasDropdown={true}
            dropdownItems={placementDropdowns}
          />
          <NavbarItem
            href="/notifications"
            label="NOTIFICATION"
            setNavbar={setOpen}
            showArrow={open}
          />
        </ul>
        <div className="mt-72 md:hidden absolute">
          <h2>@2024 CSE ASSOCIATION</h2>
          <div className="flex justify-between">
            <div className="mt-1">
              <h2 className="text-[13px]">
                DESIGN AND POWERED BY{" "}
                <span className="underline font-semibold">CSE STUDENTS</span>
              </h2>
            </div>
            <div className="flex ml-28 mr-2 gap-1">
              <AiFillInstagram className="w-6 h-6 hover:scale-95" />
              <FaLinkedin className="w-5 h-6 hover:scale-95" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
