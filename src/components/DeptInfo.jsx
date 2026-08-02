"use client";
import { DeptConstants } from "@/constants/DeptConstants";
import { FaAngleRight, FaArrowRightLong } from "react-icons/fa6";
import {
  motion,
  useAnimate,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import ColoredSection from "./ColoredSection";
import { useEffect, useRef, useState } from "react";

const DeptInfo = ({ isAboutPage = false }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(1024);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  function changeWidth() {
    setWidth(containerRef.current?.getBoundingClientRect().width ?? 1024);
  }

  useEffect(() => {
    changeWidth();
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const ANIMATION_START = 0.1;
  const ANIMATION_END = 0.5;
  const SCALEFACTOR = 512;

  const scaleBy = width / SCALEFACTOR;

  const scale = useTransform(
    scrollYProgress,
    [ANIMATION_START, ANIMATION_END],
    [Math.max(1, scaleBy), 1]
  );
  const y = useTransform(
    scrollYProgress,
    [ANIMATION_START, ANIMATION_END],
    [-300, 0]
  );

  return (
    <ColoredSection color="BLACK">
      <div
        className={
          isAboutPage
            ? "bg-white w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-32 lg:pt-40 pb-12 lg:pb-16 flex flex-col justify-center"
            : "bg-white w-full px-12 md:px-20 py-16 nav-md:py-8 nav-md:min-h-[200vh]"
        }
        id="dept"
      >
        <div
          ref={containerRef}
          className={
            isAboutPage ? "w-full" : "nav-md:min-h-screen nav-md:mt-[100vh]"
          }
        >
          {isAboutPage ? (
            <div className="w-full relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">
                <div className="lg:col-span-5">
                  <h1 className="font-bold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.15em] text-gray-900 tracking-tight">
                    The Department of <br className="hidden sm:inline" /> Computer Science <br className="hidden sm:inline" /> and Engineering
                  </h1>
                  <div className="w-16 h-[3px] bg-black mt-6 sm:mt-8 rounded-full"></div>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-gray-600 sm:text-xl md:text-2xl text-lg leading-relaxed font-normal max-w-[600px]">
                    {DeptConstants.desc}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full relative">
              <div className="">
                <motion.h1
                  style={{
                    scale: scale,
                    y: y,
                  }}
                  className={`font-medium text-4xl origin-left absolute leading-[1.1em] hidden nav-md:block`}
                >
                  The Department of Computer <br /> Science and Engineering
                </motion.h1>
                <h1
                  className={`font-medium text-xl sm:text-2xl md:text-3xl leading-[1.1em] block nav-md:hidden`}
                >
                  The Department of Computer <br /> Science and Engineering
                </h1>
                <p
                  className="text-gray-400  sm:text-2xl md:text-3xl nav-md:pt-28 pt-4 text-xl nav-md:text-3xl"
                  // style={{ paddingTop: showDivs ? "" : `${paddingVal * 2}px` }}
                >
                  {DeptConstants.desc}
                </p>
                <a
                  href="/aboutus"
                  className="inline-flex items-center group bg-black hover:bg-white text-white hover:text-black border-2 border-black p-2 mt-4 transition-all duration-300 ease-in-out transform hover:pr-6"
                >
                  Read More
                  <span className="inline-flex items-center justify-center ml-2 w-auto h-auto transform group-hover:translate-x-3 transition-all duration-300 ease-in-out">
                    <FaAngleRight className="group-hover:hidden text-white transition-all duration-300 ease-in-out" />
                    <FaArrowRightLong className="hidden group-hover:inline-flex text-black transition-all duration-300 ease-in-out" />
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </ColoredSection>
  );
};

export default DeptInfo;
