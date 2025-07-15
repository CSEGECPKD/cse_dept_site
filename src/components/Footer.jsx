"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
import ColoredSection from "./ColoredSection";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const routes = [
  {
    name: "HOME",
    urlPath: "/",
  },
  {
    name: "PEOPLE",
    urlPath: "/people",
  },
  {
    name: "PLACEMENTS",
    urlPath: "/placements",
  },
  {
    name: "ABOUT US",
    urlPath: "/aboutus",
  },
  {
    name: "ACTIVITIES",
    urlPath: "/activity/events",
  },
  // { // NO SEPERATE ROUTE EXISTS
  //   name: "CONTACT US",
  //   urlPath: "#contact-us",
  // },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, subject, message } = formData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate email format
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "cse website",
      from_subject: subject,
      message: message,
    };

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      console.log(result.text);
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.log(error.text);
      toast({
        title: "Error",
        description: "Failed to send message, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const squareBlock = (index) =>
    `w-3 h-3 bg-black hover:opacity-100 ${
      hoveredIndex === index ? "" : "bg-white"
    } mb-1.5`;
  return (
    <ColoredSection color="BLACK">
      <footer className="container lg:mx-40 flex flex-col sm:flex-row justify-between px-14 sm:px-0 py-8 pb-12 bg-white text-gray-800 w-auto font-bebasneue relative">
        <div className="flex-1 mb-4 sm:mb-0">
          <form id="contact-us" onSubmit={handleSubmit} className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-[#BDBDBD]">
              SEND YOUR MESSAGES
            </h3>
            {[
              { name: "name", placeholder: "YOUR NAME *", type: "text" },
              { name: "email", placeholder: "YOUR MAIL *", type: "email" },
              { name: "subject", placeholder: "SUBJECT *", type: "text" },
              { name: "message", placeholder: "MESSAGE *", type: "text" },
            ].map((field, index) => (
              <div key={index} className="mb-2 max-w-md">
                <input
                  className="p-2 border-b-2 border-gray-600 w-full bg-transparent outline-none"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="inline-flex items-center group bg-black hover:bg-white text-white hover:text-black text-md border-2 border-black p-1 mt-4 transition-all duration-300 ease-in-out transform hover:pr-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  SENDING...
                  <span className="ml-2 animate-spin">&#9696;</span>
                </>
              ) : (
                <>
                  SEND
                  <span className="inline-flex items-center justify-center ml-1 w-auto h-auto transform group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                    <MdOutlineArrowOutward className="group-hover:hidden text-white transition-all duration-300 ease-in-out" />
                    <FaArrowRightLong className="hidden group-hover:inline-flex text-black transition-all duration-300 ease-in-out" />
                  </span>
                </>
              )}
            </button>
          </form>
          <p className="text-[#656565] hidden sm:block">
            © {currentYear} CSE ASSOCIATION
          </p>
        </div>

        <div className="relative isolate">
          <h3 className="text-xl font-semibold mb-2 text-[#BDBDBD] sm:px-5">
            QUICK LINKS
          </h3>

          <div className="grid grid-cols-2 gap-x-[7.125rem]">
            {routes.map((eachRoute, index) => (
              <div
                key={index}
                className="flex items-center"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={squareBlock(index)}></div>
                <Link
                  className="text-16 block text-[#656565] min-w-[7.5rem] mb-1 ml-2"
                  href={eachRoute.urlPath}
                >
                  {eachRoute.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row  sm:items-center mt-8">
            <p className="text-[#656565] block sm:hidden">
              © {currentYear} CSE ASSOCIATION
            </p>
            <div className="flex items-center justify-between mt-2.5 w-full sm:absolute bottom-0">
              <p className="text-[#656565] text-sm">
                <p>
                  DESIGN AND POWERED BY{" "}
                  <Link
                    className="underline font-bold hover:text-blue-500"
                    href="/developers"
                  >
                    CSE STUDENTS
                  </Link>{" "}
                </p>
                <p>
                  NOT OFFICIALLY AFFILIATED TO CSE DEPARTMENT OF GEC PALAKKAD.
                </p>
              </p>
              <div className="flex items-center">
                <a href="https://www.instagram.com/cse_gecpkd/">
                  {" "}
                  <RiInstagramFill className="text-[#666666] w-5 h-5 hover:text-blue-700 cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com/company/csegecskp/">
                  {" "}
                  <IoLogoLinkedin className="text-[#666666] ml-2 w-5 h-5 hover:text-blue-700 cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </ColoredSection>
  );
};

export default Footer;
