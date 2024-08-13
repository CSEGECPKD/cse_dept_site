"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

const PlacementRecruiters = () => {
  const outerRef = useRef(null);
  const innerRef1 = useRef(null);
  const innerRef2 = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(20);

  const setupInstances = useCallback(() => {
    if (!innerRef1.current || !outerRef.current) return;
    const { width: innerWidth } = innerRef1.current.getBoundingClientRect();
    
    const speed = 300; // pixels per second
    setAnimationDuration(innerWidth / speed);
  }, []);

  useEffect(() => {
    setupInstances();
    window.addEventListener("resize", setupInstances);
    return () => window.removeEventListener("resize", setupInstances);
  }, [setupInstances]);

  const images1 = [
    "./Adobe.svg",
    "./Airbnb.svg",
    "./Amazon.svg",
    "./Canva.svg",
    "./Descript.svg",
    "./Discord.svg",
    "./Dropbox.svg",
  ];

  const images2 = [
    "./Pinterest.svg",
    "./Reddit.svg",
    "./OLX.svg",
    "./Microsoft.svg",
    "./LinkedIn.svg",
    "./IBM.svg",
    "./GitLab.svg",
  ];

  const ScrollingRow = ({ direction, innerRef, images }) => (
    <div
      className="flex items-center whitespace-nowrap"
      ref={innerRef}
      style={{
        animationDuration: `${animationDuration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationName: direction === "left" ? "scrollLeft" : "scrollRight",
      }}
    >
      {[...images, ...images].map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Recruiter ${index + 1}`}
          className="inline-block px-10 flex-none"
        />
      ))}
    </div>
  );

  return (
    <section className="bg-white w-full py-32">
      <div className="px-20">
        <h1 className="text-black text-[56px] font-normal font-bebasneue leading-tight">
          Our RECRUITERS
        </h1>
        
      </div>
      <div className="overflow-hidden relative pt-20" ref={outerRef}>
        <ScrollingRow direction="left" innerRef={innerRef1} images={images1} />
        <div className="my-10" />
        <ScrollingRow direction="right" innerRef={innerRef2} images={images2} />
        <div className="my-10" />
        <ScrollingRow direction="left" innerRef={innerRef1} images={images1} />
        <div className="my-10" />
        <ScrollingRow direction="right" innerRef={innerRef2} images={images2} />
        <style jsx>{`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default PlacementRecruiters;