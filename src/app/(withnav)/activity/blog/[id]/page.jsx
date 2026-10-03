"use client";
import React from "react";
import Image from "next/image";
import { IoPersonCircle } from "react-icons/io5";
import { useParams } from "next/navigation";
import { data } from "../content";

export default function DetailsPage() {
  const { id } = useParams();
  const blogItem = data.find((item) => item.id === parseInt(id));

  if (!blogItem) return <p>Blog post not found.</p>;

  return (
    <div>
      <div className="bg-[#e9e8e9] pb-5">
        <div className="container mx-auto w-full h-[200px] flex justify-center items-end">
          <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
          <h1 className="uppercase text-[28px] md:text-[35px] font-bold">
            {blogItem.head}
          </h1>
        </div>
        <h3 className="uppercase text-gray-400 text-center font-bold text-lg md:text-3xl">
          {blogItem.date}
        </h3>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative w-full h-[250px] md:h-[400px] lg:h-[520px] flex justify-center">
          <Image
            src={blogItem.img}
            alt="images"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
          <div className="w-full md:w-72 flex flex-col items-center text-center">
            <IoPersonCircle className="w-16 h-16 md:w-8 md:h-8" />
            <h1 className="text-lg md:text-xl">{blogItem.name}</h1>
            <p className="text-gray-600">{blogItem.year}</p>
          </div>
          <div className="col-span-2 text-justify text-gray-600">
            <p>{blogItem.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
