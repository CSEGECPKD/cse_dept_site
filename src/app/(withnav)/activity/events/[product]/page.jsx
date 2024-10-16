"use client";
import { useParams, useRouter } from "next/navigation";
import { upcomingEvents, pastEvents } from "../eventsData";
import { useEffect, useState } from "react";
import ColoredSection from "../../../../../components/ColoredSection";

export default function EventDetails() {
  const router = useRouter();
  const { product } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (product) {
      const allEvents = [...upcomingEvents, ...pastEvents];
      const eventDetails = allEvents.find((e) => e.id === parseInt(product));
      setEvent(eventDetails);
    }
  }, [product]);

  if (!event) return <p>Loading...</p>;

  return (
    <ColoredSection color="BLACK">
      <div className="container min-h-screen bg-white mx-auto pb-14 px-4 lg:px-0">
        <div className="w-full flex flex-col justify-center items-center pt-[100px] md:pt-[150px] lg:pt-[200px]">
          <div className="w-full h-auto flex flex-row justify-center items-end">
            <span className="w-[10px] h-[10px] bg-black mr-3 mb-4"></span>
            <h1 className="uppercase text-[28px] md:text-[35px] lg:text-[40px] w-auto h-auto font-bold">
              {event.title}
            </h1>
          </div>
          <p className="text-gray-500 text-xs md:text-sm lg:text-base mb-4 uppercase">
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="w-full h-full flex flex-col lg:flex-row mt-8">
          <div className="w-full lg:w-[40%] h-full flex justify-center items-center mb-6 lg:mb-0">
            <img
              src={event.image || "https://via.placeholder.com/600x400"}
              alt={event.title}
              className="w-[80%] md:w-[70%] h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-[50%] h-[300px] overflow-y-auto text-justify pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <p className="text-black text-base md:text-lg">
              {event.descriptions}
            </p>
          </div>
        </div>
        <button className="w-full md:w-[90%] lg:w-[88%]  h-auto p-3 mt-8 mx-auto bg-[#696969] text-white hover:border-red-500 hover:border-2 hover:bg-white hover:text-red-500 transition-all duration-300 flex justify-center items-center">
          <p className="uppercase text-sm font-semibold">register now</p>
        </button>
      </div>
    </ColoredSection>
  );
}
