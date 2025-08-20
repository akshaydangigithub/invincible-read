"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
  "/logos/logo1.webp",
  "/logos/logo2.webp",
  "/logos/logo3.webp",
  "/logos/logo4.webp",
  "/logos/logo5.webp",
  "/logos/logo6.webp",
  "/logos/logo7.webp",
  "/logos/logo8.webp",
  "/logos/logo9.webp",
  "/logos/logo10.webp",
  "/logos/logo11.png",
  "/logos/logo12.png",
  "/logos/logo13.svg",
  "/logos/logo14.jpeg",
  "/logos/logo15.jpeg",
  "/logos/logo16.jpeg",
];

const LogoScroll = () => {
  return (
    <section className="relative w-full text-white overflow-hidden py-16 px-4 sm:px-10">
      <h2 className="text-center font-montserrat font-medium text-[40px] sm:text-[60px] leading-[1.4] tracking-wide uppercase mb-10">
        Press | award | recognition
      </h2>
      <button className="mt-16 bg-[#2B23B8] text-white px-6 py-3 rounded-[11px] font-montserrat uppercase text-[16px] cursor-pointer font-medium mx-auto block">
        Web3 Media
      </button>

      {/* Marquee Container */}
      <div className="relative w-full mt-16 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0, // continuous flow
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            reverseDirection: true,
          }}

          speed={4000}
          allowTouchMove={false}
          freeMode={true}
          centeredSlides={false}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 22 },
            640: { slidesPerView: 3, spaceBetween: 24 },
            768: { slidesPerView: 4, spaceBetween: 26 },
            1024: { slidesPerView: 5, spaceBetween: 28 },
            1280: { slidesPerView: 6, spaceBetween: 30 },
          }}
          className="smooth-swiper"
          style={{
            "--swiper-wrapper-transition-timing-function": "linear",
          } as React.CSSProperties}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex items-center relative justify-center">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-20 object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LogoScroll;
