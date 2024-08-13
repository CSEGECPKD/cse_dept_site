import Acheivers from "./acheivers/page";
import React from "react";
import ColoredSection from "../../components/ColoredSection";
import AcheiversHorizontalScrollCarousel from "./acheiversHorizontalScroll/page";

const page = () => {
  return (
    <ColoredSection color="BLACK">
      <div className="mt-20">
        <Acheivers />
        <AcheiversHorizontalScrollCarousel />
      </div>
    </ColoredSection>
  );
};

export default page;
