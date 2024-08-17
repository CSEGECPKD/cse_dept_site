import React from "react";
import Navbar from "@/app/HomePage/Navbar/Navbar";
import Footer from "@/components/Footer";
import AcadamicsIntro from "@/app/academics/posandpeo/AcadamicsIntro";
import AcadamicsPrograms from "@/app/academics/prgmsandsyllabus/AcadamicsPrograms";
import Labs from "@/app/academics/labs/AcadamicsLabs";
import AcadamicsCoursesMtech from "@/components/AcadamicsCoursesMtech";
import AcadamicsCoursesBtech from "@/components/AcadamicsCoursesBtech";


const Acadamics = () => {
  return (
    <div className="">
      <AcadamicsIntro />
      <AcadamicsPrograms />
      {/* <AcadamicsCoursesBtech />
      <AcadamicsCoursesMtech />*/}
      <Labs /> 
      {/* <Footer /> */}
    </div>
  );
};

export default Acadamics;
