import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ColoredSection from "./ColoredSection";

function CourseOfferedSection() {
  return (
    <ColoredSection
      color="WHITE"
      className="relative bg-[#161616ef] text-white w-full py-20 px-24 min-h-screen flex items-center"
    >
      <Image
        src="/bg.png"
        alt="department pic"
        priority={false}
        fill
        className="object-cover -z-10"
      />
      <div className="flex items-center mx-auto w-fit xl:gap-32 lg:gap-24 gap-12">
        <div className="grid grid-cols-3">
          <Courses
            title="B.Tech Computer Science And Engineering"
            year={1999}
            intake={66}
            intakeSplit="(6 Regular And 6 LET)"
          />
          <Courses
            title="M.Tech Computational Linguistics"
            year={1999}
            intake={66}
            reverse
          />
          <Courses
            title="PhD Computer Science And Engineering"
            year={1999}
            intake={66}
          />
        </div>
        <h2 className="[writing-mode:vertical-rl] font-bebasneue xl:text-5.5xl lg:text-5xl text-4xl">
          COURSE OFFERED
        </h2>
      </div>
    </ColoredSection>
  );
}

function Courses({ title, year, intake, intakeSplit, reverse }) {
  return (
    <div className="max-w-[296px]  font-montserrat">
      <div className="relative isolate pb-12">
        <img
          className={twMerge("w-full", reverse && "transform rotate-180")}
          src="/border-circle.svg"
          alt=""
        />
        <h3 className="absolute top-[50%]  left-[50%] -translate-x-1/2 translate-y-[calc(-50%-1.5rem)] text-center font-medium lg:text-xl md:text-lg sm:text-sm text-xs">
          {title}
        </h3>
       {reverse ? (
         <Image
         className="absolute left-1/2 -translate-x-1/2 -bottom-[1%] lg:bottom-0 -z-[9] w-[5%] h-[6.4rem]"
         src="/circle-line.svg"
         width={17}
         height={100}
         alt=""
       />
       ): (
        <Image
        className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-[9] w-[5%]"
        src="/circle-line-half.svg"
        width={17}
        height={71}
        alt=""
      />
       )}
      </div>
      <div className="text-center">
        <h3 className="text-xl [leading-trim:both] [text-edge:cap] leading-6">
          {title}
        </h3>
        <div className="h-[2px] my-5 bg-white/10 w-[40%] mx-auto" />
        <p className="text-white/70 [leading-trim:both] [text-edge:cap]">
          Year Of Starting : {year}
        </p>
        <p className="text-white/70 leading-5 [leading-trim:both] [text-edge:cap]">
          Approved intake: {intake}
          {intakeSplit && (
            <>
              <br />
              {intakeSplit}
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default CourseOfferedSection;
