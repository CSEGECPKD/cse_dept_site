"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import studentsByCategory from "../../../constants/contents";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import "./style.css";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={className}>
      <HiArrowRight class="arrows" />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={className}>
      <HiArrowLeft class="arrows" />
    </div>
  );
}

const CategoryCarousel = ({ category, students }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrow: false,
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
  };

  return (
    <div className="student-card w-auto sm:w-[220px] h-full card mx-auto">
      <Slider {...settings}>
        {students.map((student, index) => (
          <div key={index} className="mx-auto">
            <div className="h-auto sm:h-[350px] w-auto">
              <div className="flex sm:flex-col bg-white justify-start items-center h-[156px]sm:h-auto w-auto sm:w-[220px] mx-auto">
                <div className="stud-image w-[170px] h-[156px] sm:w-[220px] sm:h-[220px] transition-all duration-[1s]">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="stud-details w-full h-auto text-center flex flex-col">
                  <div className="sm:hidden w-full h-[30px] flex flex-row justify-end "></div>

                  <p className="text-black text-base font-semibold ">
                    {student.name}
                  </p>
                  <div className="w-full min-h-[60px]">
                    <p className="text-gray-500  text-sm">{student.batch}</p>
                    {student.cgpa && (
                      <p className="text-gray-500 text-sm">
                        CGPA: {student.cgpa}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">{student.desc}</p>
                  </div>
                  <p className="text-white font-semibold text-sm w-full bg-[#DD846E] py-[4px] mt-3 sm:mt-0 md:mt-0 lg:mt-0">
                    {category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const page = () => {
  return (
    <div className="container mx-auto bg-white py-14 px-4 sm:px-6 h-full">
      <div className=" bg-[#e9e9e8] w-full h-full p-4 sm:p-6">
        <div className="flex justify-start w-full h-full">
          <h1 className="text-black font-bold font-bebasneue lg:text-5xl text-4xl ">
            . ACHEIVERS
          </h1>
        </div>

        <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Object.keys(studentsByCategory).map((category, index) => (
            <CategoryCarousel
              key={index}
              category={category}
              students={studentsByCategory[category]}
            />
          ))}
        </div>
        <div className="text-center w-full pt-10">
          <a
            href="achievement/more-acheivers"
            className="flex justify-center items-center w-full h-[35px] text-center text-white font-bold text-[16px] bg-[#DD846E] hover:no-underline"
          >
            LOAD MORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
