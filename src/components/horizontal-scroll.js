"use client";
import React, { useState, useEffect, useRef } from "react";

const calcDynamicHeight = (objectWidth) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return objectWidth - vw + vh;
};

const handleDynamicHeight = (ref, setDynamicHeight) => {
  if (ref.current) {
  const objectWidth = ref.current.scrollWidth;
  const dynamicHeight = calcDynamicHeight(objectWidth);
  setDynamicHeight(dynamicHeight);
  }
};

const applyScrollListener = (ref, setTranslateX) => {
  window.addEventListener("scroll", () => {
    if (ref.current) {
      const offsetTop = -ref.current.offsetTop;
      setTranslateX(offsetTop);
    }
  });
};

const MyComponent = ({ children }) => {
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef(null);
  const objectRef = useRef(null);

  const resizeHandler = () => {
    handleDynamicHeight(objectRef, setDynamicHeight);
  };

  useEffect(() => {
    handleDynamicHeight(objectRef, setDynamicHeight);
    window.addEventListener("resize", resizeHandler);
    applyScrollListener(containerRef, setTranslateX);
  }, []);

  return (
    <div className="relative w-full" style={{ height: `${dynamicHeight}px` }}>
      <div
        className="sticky top-0 h-screen w-full overflow-x-hidden"
        ref={containerRef}
      >
        <div
          className="absolute h-full will-change-transform"
          style={{ transform: `translateX(${translateX}px)` }}
          ref={objectRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

MyComponent.displayName = "MyComponent";

export default MyComponent;
