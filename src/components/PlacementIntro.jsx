import Image from "next/image";
import React from "react";
import placementLogo from "../../public/placement-cell-logo.svg";
import ColoredSection from "./ColoredSection";

const PlacementIntro = () => {
  return (
    <ColoredSection  color="BLACK">
      <div className="bg-white container mx-auto py-56 px-4 h-full md:h-[70vh]">
        <div className="w-full h-auto text-right">
          <h1 className="text-black w-auto h-auto text-4xl lg:text-5xl font-semibold font-bebasneue">
          . TRAINING & PLACEMENT
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full h-auto md:p-5 xl:p-10">
          {/* Image of hod and its desigination */}
          <div className="flex-auto w-full md:w-2/6 h-2/4 pt-5 md:pt-0 items-center justify-center ">
            <div className="w-full h-auto flex justify-center items-center">
              <img
                src={"./placement-cell-logo.svg"}
                alt="HOD Image"
                layout="responsive"
                className="w-[200px] h-[250px] xl:w-[260px] xl:h-[320px] object-cover transition duration-300 ease-in-out hover:scale-105 "
              />
            </div>

          </div>
          {/* message of hod */}
          <div className="flex-auto justify-start w-full md:w-4/6 h-2/4 pt-5 md:pt-0 md:pl-5">
            <p className="text-gray-500 text-[16px] sm:text-[17px] lg:text-[18px] xl:text-[22px] leading-[28px] md:leading-[30px] lg:leading-[40px] transition duration-300 ease-in-out hover:scale-105">
              Lorem ipsum dolor sit amet consectetur. Turpis consequat nec et suscipit in urna rhoncus. Ut amet ut arcu in ornare urna blandit. Sollicitudin sit est a odio. Eros vulputate etiam euismod risus augue feugiat in quis. Est molestie tristique feugiat faucibus tortor.Tortor nibh nunc congue consequat. Eleifend mauris magna egestas ultrices porta adipiscing turpis nunc praesent. Tortor phasellus diam arcu a massa. Cras lacus nec tellus nulla consectetur rhoncus tristique pellentesque montes. Dictumst sit vel faucibus egestas. Vehicula consectetur nisl in nulla venenatis.
            </p>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
};

export default PlacementIntro;
