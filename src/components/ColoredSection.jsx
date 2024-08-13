"use client";

import { navbarAtom } from "@/atoms/navbarAtom";
import { useInView } from "framer-motion";
import { useAtom } from "jotai";
import { forwardRef, useEffect, useRef } from "react";

const ColoredSection = ({ children, color = "WHITE", ...props }) => {
  const ref = useRef();
  const [navbarColor, setNavbarColor] = useAtom(navbarAtom);
  const isInView = useInView(ref, {
    margin: "0% 0% -95% 0%",
  });
  useEffect(() => {
    if (isInView) {
      setNavbarColor(color);
      console.log("color changed");
    }
  }, [isInView, setNavbarColor, color]);
  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
};

export default ColoredSection;
