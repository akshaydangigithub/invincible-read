"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
  "/logos/logo6.png",
  "/logos/logo7.png",
  "/logos/logo8.png",
  "/logos/logo9.png",
  "/logos/logo10.png",
  "/logos/logo11.png",
  "/logos/logo12.png",
  "/logos/logo14.png",
  "/logos/logo15.png",
  "/logos/logo16.png",
];

const LogoScroll = () => {
  return (
    <section className="relative w-full text-white overflow-hidden pt-24 lg:pb-16 px-4 sm:px-10">
      <h2 className="text-center font-montserrat font-medium text-[40px] sm:text-[60px] leading-[1] tracking-wide uppercase mb-5">
        Press
      </h2>
      <p className="text-xl font-thin text-white/80 text-center">In the Spotlight of Web3 Media</p>
      {/* <button className="mt-16 bg-[#2B23B8] text-white px-6 py-3 rounded-[11px] font-montserrat uppercase text-[16px] cursor-pointer font-medium mx-auto block">
        Web3 Media
      </button> */}

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
                className="h-24 object-contain mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LogoScroll;
