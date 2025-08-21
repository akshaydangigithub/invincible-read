"use client";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const authors = [
  {
    name: "Ajay Thakar",
    img: "/authors/ajaythakar.jpg",
  },
  {
    name: "Anant Ladha",
    img: "/authors/Anant_Ladha_BG.jpg",
  },
  {
    name: "Budhil Vyas",
    img: "/authors/Budhil Vyas.jpg",
  },
  {
    name: "Dr. Mukul Agrawal",
    img: "/authors/Dr.-Mukul-Agrawal.webp",
  },
  {
    name: "Neeraj Joshi",
    img: "/authors/Neeraj Joshi.jpg",
  },
  {
    name: "Pankaj Ladha",
    img: "/authors/Pankaj Ladha.jpg",
  },
  {
    name: "Pushkar Raj Thakur",
    img: "/authors/Pushkar-Raj-Thakur-1.webp",
  },
  {
    name: "Sachin Kumar",
    img: "/authors/Sachin Kumar.jpg",
  },
  {
    name: "Sagar Sinha",
    img: "/authors/sagarsinha.jpg",
  },
  {
    name: "Aniruddhacharya",
    img: "/authors/anirudhracharya.jpg",
  },
  {
    name: "Ankit Baiyanpuria",
    img: "/authors/ankit baiyanpuria.jpg",
  },
  {
    name: "Bageshwar Dham",
    img: "/authors/bageswar dham.jpg",
  },
  {
    name: "Diksha Arora",
    img: "/authors/diksha arora.png",
  },
  {
    name: "Dr. Imran Patel",
    img: "/authors/Dr. imran patel.jpg",
  },
  {
    name: "Kunal Saraogi",
    img: "/authors/kunal saraogi.jpg",
  },
  {
    name: "Nitish Rajput",
    img: "/authors/nitish rajput.jpg",
  },
  {
    name: "Premanand Ji Maharaj",
    img: "/authors/premanand maharaj.jpg",
  },
  {
    name: "Pr Sundar",
    img: "/authors/Pr sundar.jpg",
  },
  {
    name: "Shipra Mishra",
    img: "/authors/sipra mishra.jpg",
  },
];

const Authors = () => {
  return (
    <section className="relative w-full text-white overflow-hidden py-20 px-4 sm:px-10">
      <h2 className="text-center font-montserrat text-[40px] sm:text-[60px] leading-[1.4] tracking-wide uppercase mb-10">
        <span className="font-bold">Invincible</span> authors
      </h2>

      <div className="relative w-full mt-16 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          speed={3000}
          allowTouchMove={true}
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
          {[...authors, ...authors].map((author, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div
                className="h-72 relative  w-full rounded-lg overflow-hidden p-2 bg-[#1C1C1C] group cursor-pointer"
              >
                <img
                  src={author.img}
                  alt={`Author ${author.name}`}
                  className="h-full w-full object-cover rounded-lg grayscale-100 group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                />

                {/* Author Info Overlay */}
                <div className="absolute z-10 -bottom-5 w-[90%] left-1/2 transform -translate-x-1/2">
                  {/* Name Card - moves up on hover */}
                  <div className="bg-[#171616B8] w-full rounded-lg flex items-center justify-center py-2 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:-translate-y-10">
                    <span className="text-white uppercase text-sm font-medium text-center">
                      {author.name}
                    </span>
                  </div>

                  {/* Social Media Icons - slides up from below on hover */}
                  <div className="bg-[#171616B8] w-[70%] rounded-lg flex items-center justify-between px-3 py-2 mx-auto backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:-translate-y-8 transition-all duration-300 ease-out">
                    <FaLinkedinIn className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer" />
                    <FaInstagram className="text-white hover:text-pink-400 transition-colors duration-200 cursor-pointer" />
                    <FaTwitter className="text-white hover:text-blue-300 transition-colors duration-200 cursor-pointer" />
                    <FaFacebook className="text-white hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className="text-center font-montserrat text-2xl leading-[1.2] tracking-wide uppercase mt-10">
        Powering <span className="font-bold">2000+</span> Authors and{" "}
        <span className="font-bold">500+</span> Influencer Books.
      </h2>
    </section>
  );
};

export default Authors;
