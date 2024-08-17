import React from "react";
import Image from "next/image";
import { IoPersonCircle } from "react-icons/io5";

export default function details(item) {
  return (
    <div>
      <div className="bg-[#e9e8e9] pb-5 ">
        <div className="container mx-auto w-full h-[200px] flex justify-center items-end ">
          <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
          <h1 className="uppercase text-[35px] font-bold">
            Embracing Digital Transformation in Education
          </h1>
        </div>
        <h3 className="uppercase text-gray-400 text-center font-bold texy-3xl">
          July 15,2024
        </h3>
      </div>
      <div className="container mx-auto">
        <div className="relative w-[1500px] h-[520px] ml-6 flex justify-center">
          <Image
            src="/blog.png"
            alt="images"
            width={1600}
            height={200}
            className=""
          />
        </div>
        <div className="grid grid-flow-col-dense  mt-8 ">
          <div className="w-72 flex flex-col items-center text-center">
            <IoPersonCircle className="w-8 h-8" />
            <h1 className="text-xl">Jane Doe</h1>
            <p className="text-gray-600">2025 Pass out Batch</p>
          </div>
          <div className="w-4/4 space-y-3 text-justify mr-2 text-gray-600">
            In an era marked by rapid technological advancements, the education
            sector is undergoing a significant transformation. Digital
            technologies are revolutionizing the way we teach and learn, making
            education more accessible, engaging, and personalized. This blog
            explores the impact of digital transformation on education and how
            it is reshaping the learning landscape.
            <br />
            One of the most notable changes brought about by digital
            transformation is the shift from traditional classroom settings to
            more flexible, online learning environments. Interactive learning
            platforms, such as MOOCs (Massive Open Online Courses) and
            e-learning portals, have made it possible for students to access
            high-quality education from anywhere in the world. These platforms
            offer a wide range of courses, from basic skills to advanced
            degrees, allowing learners to tailor their education to their
            individual needs and schedules.
            <br />
            Digital transformation has also introduced innovative tools and
            technologies that enhance the learning experience. For example,
            virtual reality (VR) and augmented reality (AR) are being used to
            create immersive learning environments that can bring complex
            subjects to life. Students can explore historical sites, conduct
            virtual science experiments, and interact with 3D models, making
            learning more engaging and interactive. Additionally, AI-driven
            personalized education systems can analyze student performance data
            to provide customized learning experiences, identifying areas where
            students need improvement and offering targeted resources to help
            them succeed.
            <br />
            Collaboration and communication have also been significantly
            improved through digital transformation. Online collaboration tools,
            such as video conferencing, instant messaging, and shared document
            platforms, enable students and teachers to work together more
            effectively, regardless of geographical location. These tools
            facilitate real-time feedback and support, creating a more connected
            and.....
          </div>
        </div>
      </div>
    </div>
  );
}
