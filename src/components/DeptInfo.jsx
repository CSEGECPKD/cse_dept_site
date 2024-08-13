"use client";
import { DeptConstants } from "@/constants/DeptConstants";
import Image from "next/image";
import {
  motion,
  useAnimate,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import ColoredSection from "./ColoredSection";
import { useEffect, useRef } from "react";
import convertRange from "@/lib/convertRange";

const DeptInfo = () => {
  const [scope, animate] = useAnimate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  async function animateHeading(latest) {
    const animationStartPoint = 0;
    const animationEndPoint = 0.5;
    const fontSize = convertRange(
      latest,
      animationStartPoint,
      animationEndPoint,
      6.25,
      2.5
    );
    const top = convertRange(
      latest,
      animationStartPoint,
      animationEndPoint,
      55,
      0
    );
    console.log(fontSize);
    await animate(
      scope.current,
      {
        fontSize: `${fontSize}vw`,
        top: `-${top}%`,
      },
      {
        duration: 0.1,
        ease: "linear",
      }
    );
  }

  useEffect(() => {
    const latest = scrollYProgress.get();
    animateHeading(latest).then(() =>
      animate(
        scope.current,
        {
          opacity: 1,
        },
        {
          delay: 0.1,
        }
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, animateHeading, scope]);

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    animateHeading(latest)
  );
  return (
    <ColoredSection color="BLACK">
      <div className="bg-white w-full px-12 md:px-20 py-8 min-h-[200vh]">
        <div ref={containerRef} className="min-h-screen mt-[100vh]">
          <div className="w-full grid grid-cols-[auto_40%] relative gap-12">
            <div className="">
              <h1
                style={{
                  opacity: 0,
                }}
                ref={scope}
                className={`font-medium absolute leading-[1.1em]`}
              >
                The Department of Computer <br /> Science and Engineering
              </h1>
              <p
                className="text-gray-400 pt-[8rem] text-[2vw]"
                // style={{ paddingTop: showDivs ? "" : `${paddingVal * 2}px` }}
              >
                {DeptConstants.desc}
              </p>
              <button className="bg-black text-white p-2 mt-4 w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Read More {">"}
              </button>
            </div>
            <div className="hidden sm:flex justify-center items-center">
              <Image
                className="w-full"
                src="/computer.png"
                width={480}
                height={280}
                alt="computer"
              />
            </div>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
};

export default DeptInfo;
