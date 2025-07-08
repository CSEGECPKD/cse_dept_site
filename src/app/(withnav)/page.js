// import CourseOfferedSection from "@/components/CourseOfferedSection";

"use client";
import { useState } from "react";
import DeptInfo from "@/components/DeptInfo";
import DeptLogo from "@/components/DeptLogo";
import Footer from "@/components/Footer";
import HodMessage from "@/components/HodMessage";
import Acheivers from "@/app/(withnav)/achievement/acheivers/page";
import HomePage from "@/app/(withnav)/HomePage/page";
import References from "@/components/References";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import LenisScroll from "@/components/LenisScroll";
// import Acadamics from "./academics/page";

export default function Home() {
  return (
    <main>
      <HomePage />
      <DeptInfo />
      <DeptLogo />
      <HorizontalScrollCarousel />
      {/* <HodMessage /> */}
      {/* <Acheivers /> */}
      <References />
    </main>
  );
}
