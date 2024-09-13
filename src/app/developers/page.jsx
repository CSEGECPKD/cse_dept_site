"use client";
import ColoredSection from "@/components/ColoredSection";
import Image from "next/image";
import React from "react";
import { ImLinkedin2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";

export default function Developers() {
  const data = [
    {
      img: "/teams.png",
      name: "Muhammad Ali",
      position: "UI-UX Designer",
      linkedin: "https://www.linkedin.com/in/muhammad-ali", // LinkedIn URL
      twitter: "https://twitter.com/muhammad-ali", // Twitter URL
      github: "https://github.com/muhammad-ali", // GitHub URL
    },
    {
      img: "/teams.png",
      name: "Muhammad Hashiq",
      position: "Full-Stack Developer",
      linkedin: "https://www.linkedin.com/in/muhammad-hashiq",
      twitter: "https://twitter.com/muhammad-hashiq",
      github: "https://github.com/muhammad-hashiq",
    },
    {
      img: "/teams.png",
      name: "Viswajith vp",
      position: "Full-Stack Developer",
      linkedin: "https://www.linkedin.com/in/viswajith-vp",
      twitter: "https://twitter.com/viswajith-vp",
      github: "https://github.com/viswajith-vp",
    },
    {
      img: "/teams.png",
      name: "Jerald Joyson",
      position: "Full-Stack Developer",
      linkedin: "https://www.linkedin.com/in/jerald-joyson",
      twitter: "https://twitter.com/jerald-joyson",
      github: "https://github.com/jerald-joyson",
    },
    {
      img: "/teams.png",
      name: "Bimal Devasia",
      position: "Full-Stack Developer",
      linkedin: "https://www.linkedin.com/in/bimal-devasia",
      twitter: "https://twitter.com/bimal-devasia",
      github: "https://github.com/bimal-devasia",
    },
    {
      img: "/teams.png",
      name: "Mohammad Nishan",
      position: "Full-Stack Developer",
      linkedin: "https://www.linkedin.com/in/mohammad-nishan",
      twitter: "https://twitter.com/mohammad-nishan",
      github: "https://github.com/mohammad-nishan",
    },
  ];

  return (
    <ColoredSection>
      <div
        id="teams"
        className="bg-[#0a0a0a] h-screen text-white px-20 pt-20 overflow-hidden"
      >
        <h1 className="pt-8 text-[60px] md:text-[100px] font-semibold">
          Meet our team
        </h1>
        <div className="mt-6 w-full">
          <div className="flex space-x-8 animate-marquee">
            {data.concat(data).map((item, index) => (
              <div
                key={index}
                className="hover:z-50 inline-block min-w-[250px] md:min-w-[300px] transition-all duration-300 ease-in-out transform -translate-y-0 hover:-translate-y-10"
              >
                <Image
                  src={item.img}
                  alt="developer"
                  width={500}
                  height={200}
                  className="rounded-lg w-auto h-[300px] md:h-[400px] object-cover"
                />
                <div className="mt-4">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {item.name}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <div className="relative mt-2 w-4 h-4 bg-[#d9d9d9] rounded-lg" />
                    <h2 className="text-lg md:text-xl font-semibold">
                      {item.position}
                    </h2>
                  </div>
                  <div className="flex space-x-4 mt-5">
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ImLinkedin2 className="w-6 h-6 text-white hover:text-blue-500" />
                    </a>
                    <a
                      href={item.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsTwitterX className="w-6 h-6 text-white hover:text-blue-400" />
                    </a>
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-6 h-6 text-white hover:text-blue-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ColoredSection>
  );
}
