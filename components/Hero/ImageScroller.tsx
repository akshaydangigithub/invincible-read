"use client";

import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images: string[] = [
  "/home/img1.jpg",
  "/home/img2.jpg",
  "/home/img3.jpeg",
  "/home/img4.png",
  "/home/img5.png",
  "/home/img6.jpeg",
  "/home/img7.jpg",
];

const ImageScroller: FC = () => {
  return (
    <div className="relative w-full py-6 overflow-hidden">
      {/* Left Blur Gradient */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none" />

      {/* Right Blur Gradient */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black via-black/70 to-transparent z-10 pointer-events-none" />

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
        }}
        speed={3000}
        allowTouchMove={false}
        freeMode={true}
        centeredSlides={false}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        className="smooth-swiper"
        style={
          {
            "--swiper-wrapper-transition-timing-function": "linear",
          } as React.CSSProperties
        }
      >
        {/* Duplicate images for seamless infinite scroll */}
        {[...images, ...images].map((src: string, idx: number) => (
          <SwiperSlide key={`slide-${idx}`} className="flex justify-center">
            <div className="group cursor-pointer">
              <img
                src={src}
                alt={`Book cover ${idx + 1}`}
                className="w-48 h-64 object-cover transition-all duration-300 ease-out
                         group-hover:shadow-2xl group-hover:shadow-blue-500/30 
                         group-hover:scale-105 group-hover:brightness-110
                         will-change-transform"
                style={{ transform: "translateZ(0)" }}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageScroller;
