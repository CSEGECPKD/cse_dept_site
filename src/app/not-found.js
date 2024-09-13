"use client";
import { useState, useEffect } from "react";
import { FaAngleRight, FaArrowRightLong } from "react-icons/fa6";
import "./globals.css";

export default function Page() {
  const [showDinoGame, setShowDinoGame] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/dino-files/index.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  const handleClick = () => {
    setShowDinoGame(true);
  };

  return (
    <div
      className={`relative h-screen flex items-center justify-center ${
        showDinoGame ? "bg-white" : "bg-black"
      }`}
    >
      {showDinoGame ? (
        <div className="flex flex-col items-center justify-center z-50">
          <img
            src="/error-computer-white.png"
            alt="Computer Image"
            className="w-[206px] h-[200px] md:h-[320px] md:w-[330px] object-contain"
          />
          <div className="divider mt-28 md:mt-4 invisible md:visible w-[100px] h-[2px] bg-black my-10 md:my-5"></div>
          <div className="flex justify-center md:justify-start group transition-all duration-300 ease-in-out transform  translate-x-0 hover:-translate-x-3 ">
            <a
              href="/"
              className="text-base md:text-xl text-gray-400 font-light mr-5"
            >
              GO TO
            </a>
            <a
              href="/"
              className="text-base md:text-xl font-medium text-center inline-flex *:items-center"
            >
              HOME
              <span className="inline-flex items-center justify-center ml-2">
                <FaAngleRight className="group-hover:hidden" />
                <FaArrowRightLong className="hidden group-hover:inline-flex" />
              </span>
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center text-center md:text-left text-white">
          <div className=" flex flex-col items-center justify-center">
            <h1 className="md:text-4xl xl:text-6xl text-xl font-bold">
              &apos;404 ERROR&apos;
            </h1>
            <p className="text-gray-400 text-base xl:text-lg font-light mt-4">
              This is not the page you&apos;re looking for
            </p>
            <div className="flex justify-center md:justify-center md:mt-6 mt-4 group transition-all duration-300 ease-in-out transform  translate-x-0 hover:-translate-x-3 ">
              <a
                href="/"
                className="text-lg md:text-xl text-gray-400 font-light mr-5"
              >
                GO TO
              </a>
              <a
                href="/"
                className="text-lg md:text-xl font-medium text-center inline-flex items-center"
              >
                HOME
                <span className="inline-flex items-center justify-center ml-2">
                  <FaAngleRight className="group-hover:hidden" />
                  <FaArrowRightLong className="hidden group-hover:inline-flex" />
                </span>
              </a>
            </div>
          </div>
          <div className="divider md:w-[2px] md:h-[100px] h-[2px] w-[100px] bg-white md:mx-10 xl:mx-20 my-10"></div>
          <div
            className=" image-container mt-2 md:mt-8 md:ml-5 relative group"
            onClick={handleClick}
          >
            <img
              src="/error-computer.png"
              alt="Computer Image"
              className="w-[206px] h-[200px] md:h-[320px] md:w-[330px]  object-contain"
            />
            <img
              src="/error-cse.png"
              alt="CSE logo"
              className="w-[102px] h-[57px] md:w-[165px] md:h-[92px] cursor-pointer z-50 absolute left-[45px] top-[24px] md:left-[70px] md:top-[35px] group-hover:hidden transition-all duration-300 ease-in-out"
            />
            <img
              src="/error-cse-hover.png"
              alt="CSE logo"
              className="w-[102px] h-[57px] md:w-[165px] md:h-[92px] cursor-pointer z-50 absolute left-[45px] top-[24px] md:left-[70px] md:top-[35px] hidden transition-all duration-300 ease-in-out group-hover:block"
            />
            <img
              src="/error-cap.png"
              alt="Cap Image"
              className="w-[33px] h-[23px] md:w-[48px] md:h-[38px] z-50 absolute left-[44px] top-[40px] md:left-[73px] md:top-[43px] opacity-100 md:opacity-0 transition-all duration-300 ease-in-out transform -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
            />
          </div>
        </div>
      )}
      <div
        id="canvas-container"
        className={`flex absolute md:bottom-5 bottom-[120px] items-center justify-center w-screen border-2 ${
          showDinoGame ? "z-0" : "-z-10"
        }`}
      >
        <canvas id="game" />
      </div>
    </div>
  );
}
