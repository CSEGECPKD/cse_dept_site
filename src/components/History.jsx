import React from "react";
import Image from "next/image";

export default function History() {
  return (
    <div className="mt-10 mb-20 md:space-y-24 px-4 md:px-28">
      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2">
          <h1 className="font-bold text-3xl">History of the department</h1>
          <p className="mt-5 text-start text-xl md:text-2xl text-gray-500">
            At the heart of the digital revolution lies the computer science
            department. We are the architects of the future, unraveling the
            mysteries of computation and transforming them into groundbreaking
            technologies. Our department offers a thrilling exploration into the
            world of computers and computational systems, encompassing
            everything from the foundational algorithms that power the digital
            age to the cutting-edge advancements in artificial intelligence and
            cybersecurity.
          </p>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <Image
            src="/history1.png" // Path to your image
            alt="History of the department"
            width={400} // Desired width
            height={300} // Desired height
            className="mx-auto md:ml-80"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2 hidden md:block">
          <Image
            src="/history2.png" // Path to your image
            alt="History of the department"
            width={400} // Desired width
            height={300} // Desired height
            className="mx-auto md:ml-10"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="mt-5 text-start text-xl md:text-2xl text-gray-500">
            Whether you&apos;re fascinated by the intricate dance of data
            structures or dream of crafting the next generation of software, our
            curriculum equips you with the essential tools. We delve into the
            theoretical underpinnings of computer science, providing a
            rock-solid understanding of algorithms, programming languages, and
            the principles that govern how information is processed. This
            knowledge becomes the springboard for practical application.
            You&apos;ll not only learn to code but also to design, analyze, and
            build complex software systems.
          </p>
        </div>
      </div>
    </div>
  );
}
