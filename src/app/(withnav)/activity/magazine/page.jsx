"use client";
import React, { useState } from "react";
import { departmentMagazine, pgMagazine, pgNewsLetter } from "./magazine";
import Modal from "./modal";
import ColoredSection from "../../../../components/ColoredSection";
import FlipBook from "./FlipBook";

const EventCard = ({ event, onCardClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Always use onCardClick, which will handle both PDFs and other URLs
    onCardClick(event.pdf);
  };

  return (
    <div
      className="border flex flex-col md:flex-row px-4 md:px-10 py-6 md:py-9 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-auto w-full md:w-auto overflow-hidden mb-4 md:mb-0">
        <img
          src={event.image}
          alt={event.title}
          width={500}
          height={500}
          className={`object-cover w-full h-48 md:h-auto transition duration-300 ${
            isHovered ? "" : "grayscale"
          }`}
        />
      </div>

      <div className="px-0 md:px-4 flex flex-col justify-between">
        <div className="flex mb-2 text-black">
          <span
            className={`font-bold text-lg md:text-[22px] transition duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            .
          </span>
          <h2
            className={`font-bold text-lg md:text-[22px] transition duration-500 ${
              isHovered ? "translate-x-2" : ""
            }`}
          >
            {event.title}
          </h2>
        </div>

        <p
          className={`text-base md:text-[20px] transition duration-500 ${
            isHovered ? "text-red-500" : "text-gray-600"
          }`}
        >
          {event.description}
        </p>
        <div>
          <hr
            className="w-full md:w-[400px] my-4 border-black mx-auto transition duration-500"
            style={{ borderColor: isHovered ? "red" : "black" }}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-2 md:mb-0">
            <p className="text-gray-800 text-base md:text-[18px] font-semibold">
              Published In
            </p>
            <p
              className={`text-base md:text-[18px] transition duration-500 ${
                isHovered ? "text-red-500" : "text-gray-600"
              }`}
            >
              {event.date}
            </p>
          </div>
          <div>
            <button
              className={`text-white text-base md:text-[18px] px-4 py-2 transition duration-500 rounded w-full md:w-auto ${
                isHovered ? "bg-red-500" : "bg-gray-500"
              }`}
            >
              READ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsSection = ({ title, events, onCardClick }) => {
  const [visibleEvents, setVisibleEvents] = useState(4);

  const loadMore = () => {
    setVisibleEvents((prevVisible) => Math.min(prevVisible + 4, events.length));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="w-full h-full flex justify-start items-end pt-8">
        <span className="w-2 h-2 md:w-3 md:h-3 bg-black mb-3 md:mb-5 mr-2 md:mr-3"></span>
        <h1 className="uppercase text-3xl md:text-[48px] font-bold">{title}</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2">
        {events.slice(0, visibleEvents).map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            onCardClick={onCardClick}
            index={index}
          />
        ))}
      </div>
      {visibleEvents < events.length && (
        <div className="text-center mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (pdf) => {
    if (pdf.endsWith('.pdf')) {
      setSelectedPdf(pdf);
      setShowModal(true);
    } else if (pdf.startsWith('http://') || pdf.startsWith('https://')) {
      window.open(pdf, "_blank");
    } else {
      setSelectedPdf(pdf);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPdf(null);
  };

  return (
    <ColoredSection color="BLACK">
      <div>
        <div className="bg-[#e9e8e9]">
          <div className="container mx-auto w-full h-[200px] md:h-[350px] flex justify-start items-end pb-4 md:pb-8 px-4 md:px-0">
            <span className="w-2 h-2 md:w-3 md:h-3 bg-black mb-3 md:mb-5 mr-2 md:mr-3"></span>
            <h1 className="uppercase text-3xl md:text-[48px] font-bold">
              MAGAZINE - NEWSLETTERS
            </h1>
          </div>
        </div>
        <div className="bg-white container mx-auto">
          <EventsSection
            title="Department Magazine"
            events={departmentMagazine}
            onCardClick={handleCardClick}
          />
          {/* <EventsSection
            title="PG Magazine"
            events={pgMagazine}
            onCardClick={handleCardClick}
          /> */}
          <div className="container mx-auto py-8 px-4 md:px-0">
            <div className="w-full h-full flex justify-start items-end pt-8">
              <span className="w-2 h-2 md:w-3 md:h-3 bg-black mb-3 md:mb-5 mr-2 md:mr-3"></span>
              <h1 className="uppercase text-3xl md:text-[48px] font-bold">
                PG NewsLetter
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {pgNewsLetter.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for FlipBook */}
      {showModal && (
        <Modal onClose={closeModal}>
          {selectedPdf.endsWith('.pdf') ? (
            <FlipBook pdf={selectedPdf} />
          ) : (
            <iframe
              src={selectedPdf}
              title="External Content"
              width="100%"
              height="600px"
              style={{ border: 'none' }}
            />
          )}
        </Modal>
      )}
    </ColoredSection>
  );
}
