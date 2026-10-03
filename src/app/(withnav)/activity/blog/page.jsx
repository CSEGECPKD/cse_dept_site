"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getBlogs } from "@/actions/blog.action"; // Import the server action

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogsData = await getBlogs();
        setData(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="bg-[#e9e8e9]">
        <div className="container mx-auto w-full h-[250px] md:h-[350px] flex justify-start items-end pb-8 px-4 md:px-8">
          <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
          <h1 className="uppercase text-[32px] md:text-[48px] font-bold">
            Blogs
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="container mx-auto py-20 text-center">
          <p className="text-xl">Loading blogs...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="container mx-auto py-20 text-center">
          <p className="text-xl">No blogs found</p>
        </div>
      ) : (
        data.map((item) => <HoverableItem key={item._id} item={item} />)
      )}
    </div>
  );
}

function HoverableItem({ item }) {
  const [isHover, setHover] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activity/blog/${item._id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div
        className="container mx-auto flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10 pt-10 px-4 md:px-8"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="bg-slate-500 relative w-full md:w-1/2 h-auto">
          <Image
            src={item.authorImage || "/placeholder-image.jpg"}
            alt={item.name}
            width={800}
            height={400}
            className={`${
              isHover ? "" : "grayscale"
            } transition-all duration-300 w-full object-cover`}
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex mb-5 mt-5 justify-start items-end">
            <span
              className={`dot w-1 h-1 bg-black mb-2 ${
                isHover ? "block" : "hidden"
              } transition-opacity duration-400`}
            ></span>
            <h1
              className={`text-xl md:text-2xl ${
                isHover ? "translate-x-3" : ""
              } transition-transform duration-300`}
            >
              {item.name}
            </h1>
          </div>
          <pre
            className={`${
              isHover ? "text-[#dc856e]" : "text-[#000000]"
            } transition-colors duration-300 text-[16px] md:text-[20px]`}
          >
            {item.type}
          </pre>
          <div className="bg-black w-full border border-black mt-6"> </div>
          <div className="flex flex-col md:flex-row justify-between mt-5">
            <div className="flex gap-5">
              <div
                className={`text-xl md:text-2xl mt-3 w-10 h-10 ${
                  isHover ? "text-[#dc856e]" : "text-[#000000]"
                }`}
              >
                {/* Simple text icon based on type */}
                {item.type.charAt(0).toUpperCase()}
              </div>
              <div className="mt-3">
                <h1 className="text-sm md:text-base">{item.authorName}</h1>
                <p
                  className={`${
                    isHover ? "text-[#dc856e]" : "text-[#000000]"
                  } text-xs md:text-sm`}
                >
                  {item.authorPosition}
                </p>
              </div>
            </div>
            <div
              className={`mt-3 md:mt-10 ${
                isHover ? "text-[#dc856e]" : "text-[#000000]"
              } text-sm md:text-base`}
            >
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10 mx-4 md:mx-48 border border-black" />
    </div>
  );
}
