import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import React from "react";

export default function Contact() {
  return (
    <div className="container mx-auto lg:mx-24 px-4 my-12">
      <div className="flex flex-wrap space-y-6 md:space-y-0 md:space-x-3 lg:ml-10   ">
        <div className="w-full md:w-1/4 ">
          <h1 className="uppercase text-4xl font-bold">Contact Us</h1>
          <div className="flex mt-6 space-x-2">
            <FaLocationDot className="w-6 h-7 text-gray-600 mt-1" />
            <div>
              <h2 className="mb-2">Our Address</h2>
              <p>
                Government Engineering College Sreekrishnapuram, Kerala, 678633
              </p>
            </div>
          </div>
          <div className="flex mt-6 space-x-2">
            <MdOutlineEmail className="w-6 h-7 text-gray-600 mt-1" />
            <div>
              <h2 className="mb-2">Email Us</h2>
              <p>csehod@gecskp.ac.in</p>
              <p>sabitha@gecskp.ac.in</p>
            </div>
          </div>
          <div className="flex mt-6 space-x-2">
            <IoCallOutline className="w-6 h-7 text-gray-600 mt-1" />
            <div>
              <h2 className="mb-2">Call Us</h2>
              <p>+91 4662260565</p>
              <p>+91 9497686588</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 h-[300px] sm:h-[450px] border-2 border-black rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.7925904290955!2d76.43187407594881!3d10.903361589253265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d635151d9b73%3A0xecf06761ecf4f56c!2sGovt.%20Engineering%20College%20Sreekrishnapuram!5e0!3m2!1sen!2sin!4v1725817327408!5m2!1sen!2sin"
            width="400"
            height="400"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="border-0 w-full h-full"
          ></iframe>
        </div>

        <div className="w-full md:w-1/3 h-[300px] sm:h-[450px] border-2 border-black rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.7925904290955!2d76.43187407594881!3d10.903361589253265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d635151d9b73%3A0xecf06761ecf4f56c!2sGovt.%20Engineering%20College%20Sreekrishnapuram!5e0!3m2!1sen!2sin!4v1725817327408!5m2!1sen!2sin"
            width="400"
            height="400"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
