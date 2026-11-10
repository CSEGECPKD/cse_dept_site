import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { IoCallOutline } from 'react-icons/io5';
import React from 'react';
import ColoredSection from './ColoredSection';

export default function Contact() {
    return (
        <ColoredSection color="BLACK">
            <div
                className="container mx-auto px-6 sm:px-12 md:px-16 my-16 md:my-24 scroll-mt-24"
                id="contact"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Column 1: Contact Details */}
                    <div className="lg:col-span-4 flex flex-col justify-start">
                        <h2 className="uppercase text-4xl sm:text-5xl font-bold font-bebasneue tracking-wide text-black mb-6">
                            . CONTACT US
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-3.5">
                                <FaLocationDot className="w-5 h-5 text-[#DD846E] mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base">
                                        Our Address
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">
                                        Government Engineering College, Sreekrishnapuram, Palakkad, Kerala - 678633
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5">
                                <MdOutlineEmail className="w-5 h-5 text-[#DD846E] mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        <a href="mailto:csehod@gecskp.ac.in" className="hover:text-black transition">
                                            csehod@gecskp.ac.in
                                        </a>
                                    </p>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        <a href="mailto:helen@gecskp.ac.in" className="hover:text-black transition">
                                            helen@gecskp.ac.in
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5">
                                <IoCallOutline className="w-5 h-5 text-[#DD846E] mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base">
                                        Call Us
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        <a href="tel:+914662260565" className="hover:text-black transition">
                                            +91 466 226 0565
                                        </a>
                                    </p>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        <a href="tel:+919497686588" className="hover:text-black transition">
                                            +91 949 768 6588
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Google Maps Campus Location */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Campus Location (Google Maps)
                            </span>
                        </div>
                        <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px] border-2 border-black/15 rounded-xl overflow-hidden shadow-sm bg-gray-100">
                            <iframe
                                title="GEC Palakkad Campus Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.7925904290955!2d76.43187407594881!3d10.903361589253265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d635151d9b73%3A0xecf06761ecf4f56c!2sGovt.%20Engineering%20College%20Sreekrishnapuram!5e0!3m2!1sen!2sin!4v1725817327408!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                    {/* Column 3: Mappedin Indoor Navigator */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Indoor Navigator (Mappedin)
                            </span>
                        </div>
                        <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px] border-2 border-black/15 rounded-xl overflow-hidden shadow-sm bg-gray-100">
                            <iframe
                                title="GEC Palakkad Indoor Campus Navigation"
                                src="https://app.mappedin.com/map/65fbc2aa7c0c4fe5b4cc4683/directions?floor=m_c235d70c9e691132&location=s_fca685ba2c784ab7&departure=s_c0ed60b6daeada7c"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
}
