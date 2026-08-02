import React from "react";
import Image from "next/image";

export default function Library() {
  return (
    <div
      className="mt-10 mb-20 md:space-y-24 px-4 md:px-28 mx-8"
      id="library"
    >
      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2">
          <h1 className="font-bold text-3xl">Department Library</h1>
          <p className="mt-5 text-xl md:text-2xl text-gray-500 text-justify">
            The Department Library serves as a dedicated knowledge center for
            students, faculty, and researchers. It houses an extensive
            collection of textbooks, reference books, journals, magazines,
            project reports, and digital learning resources covering Computer
            Science, Information Technology, Artificial Intelligence, Data
            Science, Cybersecurity, and other emerging technologies. The
            library provides a peaceful and resource-rich environment that
            encourages academic excellence, research, and self-learning.
          </p>
        </div>

        <div className="w-full md:w-1/2 hidden md:block">
          <Image
            src="/library1.jpg"
            alt="Department Library"
            width={900}
            height={900}
            className="mx-auto rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2 hidden md:block">
          <Image
            src="/library2.png"
            alt="Department Library Resources"
            width={400}
            height={300}
            className="mx-auto md:ml-10"
          />
        </div>

        <div className="w-full md:w-1/2">
          <p className="mt-5 text-xl md:text-2xl text-gray-500 text-justify">
            Equipped with modern facilities and a well-organized collection,
            the library supports students in coursework, seminars, projects,
            competitive examinations, and research activities. In addition to
            printed materials, users can access e-books, online journals, and
            digital repositories that keep them updated with the latest
            technological advancements. The department library plays a vital
            role in fostering innovation, critical thinking, and a lifelong
            passion for learning.
          </p>
        </div>
      </div>
    </div>
  );
}