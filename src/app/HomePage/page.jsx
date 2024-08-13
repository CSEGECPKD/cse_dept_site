"use client";

import React, { useEffect, useState, useRef } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import ColoredSection from "../../components/ColoredSection";

function Home() {
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  const handleClick = () => {
    setIsVisible(!isVisible);
    // if (!isVisible) {
    //   setTimeout(() => {
    //     setIsVisible(false);
    //   }, 5000);
    // }
  };

  return (
    <ColoredSection color="WHITE">
      <div className="relative h-screen overflow-hidden">
        <div
          className="flex gap-2 content absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white"
          data-aos="fade-right"
        >
          <div className="lg:w-3 lg:h-3 w-2 h-2 mt-3 bg-white"></div>
          <div>
            <h1 className="lg:text-4xl font-bold text-[20px]">
              COMPUTER SCIENCE AND ENGINEERING
            </h1>
            <p className="font-bold lg:text-[18px] text-[10px]">
              GOVERNMENT ENGINEERING COLLEGE, SREEKRISHNAPURAM, PALAKKAD
            </p>
          </div>
        </div>

        <div className="overflow-hidden relative w-full h-screen">
          <video
            src="bg.mp4"
            autoPlay
            muted
            loop
            playsinline
            preload="metadata"
            _type="video"
            className="w-full h-full object-cover absolute top-0 z-[-1] ease-quart-out transition-opacity duration-100"
          />

          <div
            ref={notificationRef}
            onClick={handleClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="absolute bottom-48 right-0 mt-48 box-content px-3 py-2 w-12 rounded-sm  cursor-pointer"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(30px)",
            }}
            data-aos="fade-left"
          >
            <MdOutlineNotifications style={{ color: "#FFFFFF" }} size={26} />
          </div>

          {isVisible && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                backdropFilter: "blur(30px)",
              }}
              className="text-white h-24 bottom-48 absolute mt-48 right-5 box-content px-3 py-2 rounded-sm cursor-pointer"
            >
              <div className="flex gap-3 mb-3">
                <h2 className="text-[20px]">NOTIFICATION</h2>
                <MdOutlineNotifications
                  style={{ color: "#FFFFFF" }}
                  size={26}
                />
              </div>
              <div>
                <p>SERIES EXAM STARTS IN DECEMBER</p>
                <p>20 2023 FOR S3 AND S5 STUDENTS</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ColoredSection>
  );
}

export default Home;
