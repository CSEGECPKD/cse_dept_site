"use client";

import { ReactLenis } from "lenis/react";

function LenisScroll({ children }) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisScroll;
