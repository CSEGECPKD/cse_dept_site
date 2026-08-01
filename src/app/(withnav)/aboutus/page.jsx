import React from "react";
import DeptInfo from "../../../components/DeptInfo";
import DeptLogo from "../../../components/DeptLogo";
import History from "../../../components/History";
import CourseOfferedSection from "@/components/CourseOfferedSection";
import Contact from "@/components/Contact";

export default function About() {
  return (
    <main className="space-y-16 md:space-y-24">
      <DeptInfo isAboutPage={true} />
      <DeptLogo />
      <CourseOfferedSection />
      <History />
      <Contact />
    </main>
  );
}
