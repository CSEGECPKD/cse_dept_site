"use client"
import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ColoredSection from "./ColoredSection";
export default function References() {
  let imag = [
    {
      org: "../images/1.jpg",
      hvr: "../images/1h.svg",
      link: "http://gecskp.ac.in",
    },
    {
      org: "../images/2.jpg",
      hvr: "../images/2h.svg",
      link: "https://digipay.dtekerala.gov.in",
    },
    {
      org: "../images/3.jpg",
      hvr: "../images/3h.svg",
      link: "https://ktu.edu.in/",
    },
    {
      org: "../images/4.jpg",
      hvr: "../images/4h.svg",
      link: "http://gecskp.ac.in/",
    },
    {
      org: "../images/5.jpg",
      hvr: "../images/5h.svg",
      link: "http://gecskp.ac.in/",
    },
    {
      org: "../images/6.jpg",
      hvr: "../images/6h.svg",
      link: "http://gecskp.ac.in/",
    },
    {
      org: "../images/7.jpg",
      hvr: "../images/7h.svg",
      link: "http://gecskp.ac.in/",
    },
    {
      org: "../images/8.jpg",
      hvr: "../images/8h.svg",
      link: "http://gecskp.ac.in/",
    },
    {
      org: "../images/9.jpg",
      hvr: "../images/9h.svg",
      link: "http://gecskp.ac.in/",
    },
  ];

  let comp = useRef(null);
  let item1 = useRef(null);
  let items2 = useRef(null);
  let item3 = useRef(null);
  let text1 = useRef(null);
  let text2 = useRef(null);
  let animatedRef = useRef(null);

  useGSAP(() => {
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: animatedRef,
      },
    });

    t1.from(comp.current, { scrollTrigger: animatedRef, x: -900, duration: 2 });

    let t2 = gsap.timeline();

    t2.to(item3.current, { opacity: 100 })
      .to(items2.current, { opacity: 100 })
      .to(item1.current, { opacity: 100 });
  }, []);
  return (
    <ColoredSection color="BLACK">
      <div
        className="text-black lg:max-w-screen overflow-x-hidden"
        ref={animatedRef}
      >
        <div className="lg:flex-row flex flex-col-reverse lg:10 xl:px-20 justify-between">
          <div className="lg:flex-none flex flex-col justify-center items-center">
            <h1
              ref={text1}
              className="self-start lg:block lg:px-0 px-10 font-bold mt-[1rem] mb-[1rem] font-bebasneue text-[56px]"
            >
              .REFERENCES
            </h1>
            <div
              ref={comp}
              className="grid lg:grid-cols-[repeat(3,150px)] lg:grid-rows-[repeat(3,150px)] grid-cols-[repeat(3,30%)] grid-rows-[repeat(3,100px)] md:grid-rows-[repeat(3,150px)] gap-[24px] grid-flow-row lg:w-min w-full px-10 lg:px-0"
            >
              {imag.map((sr, index) => (
                <a
                  key={index}
                  href={sr.link}
                  className="items relative flex rounded justify-center items-center lg:hover:border-[1px] lg:hover:border-newblue"
                >
                  <img
                    className="absolute h-full inset-0 w-full"
                    src={sr.hvr}
                    alt=""
                  />
                  <img
                    className="absolute inset-0 h-full w-full opacity-100 hover:duration-[0.5s] transition-all lg:hover:opacity-0"
                    src={sr.org}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:w-[60%] px-5 lg:px-0">
            <div ref={text2} className="flex lg:justify-end">
              <p className="text-[56px] font-bebasneue mt-[1rem] mb-[1rem] font-bold">
                .NEW POSTS
              </p>
            </div>
            <div className="flex gap-[2rem]">
              <div className="w-[100%]">
                <div className="flex flex-row flex-wrap lg:flex-nowrap gap-[0.8rem] lg:w-auto justify-center w-[100%]">
                  <div
                    ref={item1}
                    className="group lg:basis-auto basis-full relative lg:h-[500px] h-[350px] lg:w-[30rem] hover:w-[45rem] w-[100%] opacity-0 overflow-hidden transition-all duration-[1s] rounded-xl"
                  >
                    <div className="absolute bg-gradient-to-b from-[rgba(-1,-1,-1,0.7)] to-[rgba(0,0,0,0)] inset-x-0 z-1 w-full h-[50%]"></div>
                    <div className="absolute bg-gradient-to-t from-[rgba(-1,-1,-1,0.7)] to-[rgba(0,0,0,0)] inset-x-0 bottom-0 z-1 w-full h-[50%]"></div>
                    <img
                      className="h-full w-full object-cover transition-all"
                      src="../images/Frame 80.jpg"
                      alt=""
                    />
                    <div className="absolute inset-0">
                      <p className="absolute inset-x-5 top-6 text-white font-montserrat text-4xl font-bold">
                        TO DO LISTING
                      </p>
                      <div className="absolute inset-x-5 bottom-6">
                        <div className="text-white">
                          Lorem ipsum dolor sit amet
                          <style>
                            {`.parent:hover svg {
                        fill: black;
                        transform: scaleX(2.5);
                        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                        duration: 1s;
                      }
                      .parent:hover {
                        width: 12rem;
                        gap: 20px;
                      }`}
                          </style>
                          <div className="parent mt-[7px] cursor-pointer hover:bg-white duration-[0.8s] hover:text-black bg-black font-bold w-[9rem] flex justify-center gap-[0.8rem]">
                            READ MORE
                            <svg
                              className="w-[20px] fill-white hover:fill-black"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 25 25"
                            >
                              <path
                                d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                                data-name="Right"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={items2}
                    className="group lg:basis-auto basis-1/3 opacity-0 lg:hover:w-[45rem] relative lg:h-[500px] h-[350px] min-w-[47%] sm:min-w-[48%] lg:w-[20rem] lg:min-w-min overflow-hidden transition-all duration-[1s] rounded-xl"
                  >
                    <div className="absolute bg-gradient-to-b from-[rgba(-1,-1,-1,0.7)] to-[rgba(0,0,0,0)] inset-x-0 z-1 w-full h-[50%]"></div>
                    <div className="absolute bg-gradient-to-t from-[rgba(-1,-1,-1,0.7)] to-[rgba(0,0,0,0)] inset-x-0 bottom-0 z-1 w-full h-[50%]"></div>
                    <img
                      className="h-full w-full object-cover transition-all"
                      src="../images/Frame77 .jpg"
                      alt=""
                    />
                    <div className="absolute inset-0">
                      <div className="absolute text-white font-montserrat text-4xl font-bold inset-x-5 top-6">
                        DIGI SITE
                      </div>
                      <div className="absolute inset-x-5 bottom-6 text-white">
                        <p className="text-gray-300">Lorem ipsum dolor si</p>
                        <div className="parent mt-[7px] cursor-pointer hover:bg-white duration-[0.8s] hover:text-black bg-black font-bold w-[9rem] flex justify-center gap-[0.8rem]">
                          READ MORE
                          <svg
                            className="w-[20px] fill-white hover:fill-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 25 25"
                          >
                            <path
                              d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                              data-name="Right"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={item3}
                    className="group lg:basis-auto basis-1/3 lg:hover:w-[45rem] relative lg:h-[500px] h-[350px] min-w-[48%] lg:w-[20rem] lg:min-w-min opacity-0 overflow-hidden transition-all duration-[1s] rounded-xl"
                  >
                    <div className="absolute bg-gradient-to-b from-[rgba(-1,-1,-1,0.7)] to-[rgba(0,0,0,0)] inset-x-0 z-1 w-full h-[50%]"></div>
                    <div className="absolute bg-gradient-to-t from-[rgba(-1,-1,-1,0.7)] to-[rgba(0,0,0,0)] inset-x-0 bottom-0 z-1 w-full h-[50%]"></div>
                    <img
                      className="h-full w-full object-cover transition-all"
                      src="../images/Frame81.jpg"
                      alt=""
                    />
                    <div className="absolute inset-0">
                      <div className="absolute text-white font-bold font-montserrat text-4xl inset-x-5 top-6">
                        MORE
                      </div>
                      <div className="absolute inset-x-5 bottom-6 text-white">
                        <p className="text-gray-300">Lorem ipsum, dolor sit</p>
                        <div className="parent mt-[7px] cursor-pointer hover:bg-white duration-[0.5s] hover:text-black bg-black font-bold w-[9rem] flex justify-center gap-[0.8rem]">
                          READ MORE
                          <svg
                            className="w-[20px] fill-white hover:fill-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 25 25"
                          >
                            <path
                              d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                              data-name="Right"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
}