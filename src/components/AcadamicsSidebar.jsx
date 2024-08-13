"use client";

import React, { useState, useEffect } from "react";

const AcadamicsSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`sidebar z-10 fixed flex flex-col justify-center h-screen left-0 cursor-pointer ${
        isMobile ? "hidden" : ""
      }`}
    >
      {!open && (
        <div
          className="w-[26px] h-[322px] p-[26px_28px_26px_0] gap-0 border border-transparent border-t border-solid justify-center opacity-100 bg-black flex align-middle"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        ></div>
      )}
      {open && (
        <div
          className="sidebar-popup w-[133px] h-[502px] ml-[26px] bg-black text-white justify-between opacity-[0px] gap-0 border-[0px]"
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="flex flex-col items-center font-bebasneue text-base/[19.2px] font-normal text-center tracking-[0.04rem]">
            <li className="p-[25px]">
              PO, PsO
              <br />
              and
              <br />
              PEO
            </li>
            <li className="p-[25px]">
              Programmes
              <br />
              and Syllabi
            </li>
            <li className="p-[25px]">Courses</li>
            <li className="p-[25px]">
              Academic
              <br />
              Calender
            </li>
            <li className="p-[25px]">Labs</li>
            <li className="p-[25px]">Library</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default AcadamicsSidebar;
