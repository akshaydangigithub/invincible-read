"use client";

import React from "react";

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
];

const LogoScroll = () => {
  return (
    <section className="relative w-full text-white overflow-hidden py-16 px-4 sm:px-10">
      <h2 className="text-center font-montserrat font-medium text-[48px] sm:text-[60px] leading-[72px] tracking-wide uppercase mb-10">
        Press | award | recognition
      </h2>

      <button className="mt-6 bg-[#2B23B8] text-white px-6 py-3 rounded-[11px] font-montserrat uppercase text-[16px] cursor-pointer font-medium mx-auto block">
        Print media
      </button>

      {/* Marquee Container */}
      <div className="relative w-full mt-16 overflow-hidden">
        <div className="flex animate-marquee1 whitespace-nowrap">
          {/* First set of logos */}
          <div className="flex items-center space-x-14">
            {logos.map((logo, index) => (
              <img
                key={`first-${index}`}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-12 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <button className="mt-16 bg-[#2B23B8] text-white px-6 py-3 rounded-[11px] font-montserrat uppercase text-[16px] cursor-pointer font-medium mx-auto block">
        Web3 Media
      </button>

      {/* Marquee Container */}
      <div className="relative w-full mt-16 overflow-hidden">
        <div className="flex animate-marquee2 whitespace-nowrap">
          {/* First set of logos */}
          <div className="flex items-center space-x-14">
            {logos.map((logo, index) => (
              <img
                key={`first-${index}`}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-12 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoScroll;
