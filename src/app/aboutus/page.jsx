import React from "react";
import DeptInfo from "@/components/DeptInfo";
import DeptLogo from "@/components/DeptLogo";
import HomePage from "@/app/HomePage/page";
import Acadamics from "@/app/academics/page";
import History from "../../components/History";
import AboutusHorizontalScrollCarousel from "./aboutUsHorizontalScroll/page";
import CourseOfferedSection from "@/components/CourseOfferedSection";
import Contact from "@/components/Contact";

export default function About() {
  return (
    <main>
      <HomePage />
      <DeptInfo />
      <DeptLogo />
      <CourseOfferedSection />
      <History />
      <AboutusHorizontalScrollCarousel />
      <Contact/>

    </main>
  );
}
