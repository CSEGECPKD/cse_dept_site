"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ColoredSection from "./ColoredSection";
// import { useMediaQuery } from "react-responsive";
import HorizontalScroll from "./horizontal-scroll";

const HorizontalScrollCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <ColoredSection color="WHITE">
      <main className="bg-black">
        <section className="relative w-[100%] min-h-[100vh]">
          {isMobile ? (
            <div className="flex flex-col h-auto w-screen items-center overflow-hidden">
              <motion.div>
                <Card
                  card={{
                    url: "/ImageScroll/image1.png",
                    height: "390px",
                    width: "310px",
                    title: "Title 1",
                    id: 1,
                  }}
                  position="top-[50%] right-10 -translate-y-1/2"
                />
                <Card
                  card={{
                    url: "/ImageScroll/image2.png",
                    height: "350px",
                    width: "310px",
                    title: "Title 2",
                    id: 2,
                  }}
                  position="top-[50%] left-10 -translate-y-1/2"
                />
                <Card
                  card={{
                    url: "/ImageScroll/image1.png",
                    height: "390px",
                    width: "310px",
                    title: "Title 3",
                    id: 3,
                  }}
                  position="top-[50%] right-10 -translate-y-1/2"
                />
                <Card
                  card={{
                    url: "/ImageScroll/image2.png",
                    height: "350px",
                    width: "310px",
                    title: "Title 4",
                    id: 4,
                  }}
                  position="top-[50%] left-10 -translate-y-1/2"
                />
              </motion.div>
            </div>
          ) : (
            <HorizontalScroll>
              <div className="relative h-full pl-[150px] bg-black flex flex-row flex-nowrap justify-start items-center">
                <div className="relative h-[700px] w-[600px] mr-[75px] flex-shrink-0">
                  <div className="absolute h-[650px] w-[550px] top-0 right-0">
                    <img
                      src="/ImageScroll/image1.png"
                      className="w-full h-full object-cover"
                      alt="random image"
                    />
                  </div>
                </div>
                <div className="relative h-[700px] w-[600px] mr-[75px] flex-shrink-0">
                  <div className="absolute h-[650px] w-[550px] bottom-0 right-0">
                    <img
                      src="/ImageScroll/image2.png"
                      className="w-full h-full object-cover"
                      alt="random image"
                    />
                  </div>
                </div>
                <div className="relative h-[700px] w-[600px] mr-[75px] flex-shrink-0">
                  <div className="absolute h-[650px] w-[550px] top-0 right-0">
                    <img
                      src="/ImageScroll/image1.png"
                      className="w-full h-full object-cover"
                      alt="random image"
                    />
                  </div>
                </div>
                <div className="relative h-[700px] w-[600px] mr-[75px] flex-shrink-0">
                  <div className="absolute h-[650px] w-[550px] bottom-0 right-0">
                    <img
                      src="/ImageScroll/image2.png"
                      className="w-full h-full object-cover"
                      alt="random image"
                    />
                  </div>
                </div>
              </div>
            </HorizontalScroll>
          )}
        </section>
      </main>
    </ColoredSection>
  );
};

export default HorizontalScrollCarousel;

const Card = ({ card, position }) => {
  return (
    <div className="main-card w-[400px] h-[500px] md:w-[800px] xl:w-[800px] md:h-auto xl:h-auto relative">
      <div
        key={card.id}
        className={`group absolute overflow-hidden bg-neutral-200 ${position} border-2`}
        style={{ height: card.height, width: card.width }}
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 ease-in-out group-hover:scale-100"
        ></div>
      </div>
    </div>
  );
};
