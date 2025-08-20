"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Left = () => {
  return (
    <section className="relative w-full lg:min-h-screen min-h-[100vh] overflow-hidden text-white flex flex-col items-center justify-center px-4 sm:px-8">
      <img
        src="/background2.png"
        alt="Background"
        className="absolute md:h-[30%] h-[30%] md:top-1/2 top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      {/* 📱 Phone Image */}
      <div className="absolute w-[300px] h-[400px] sm:w-[250px] sm:h-[500px] left-1/2 md:top-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 z-20">
        <Image
          src="/iPhone2.png"
          alt="App Phone"
          fill
          className="object-contain rounded-[60px]"
        />
      </div>

      {/* 📢 Headings */}
      <div className="text-center z-20 px-4 md:mb-[25rem] mb-[30rem] w-fit mx-auto">
        <h2 className="text-[40px] sm:text-[60px] leading-[1] font-['Cormorant_SC'] font-semibold uppercase tracking-[-0.04em'] max-w-[80vw] break-words">
          DOWNLOAD
        </h2>
        <div className="flex flex-row gap-2 sm:gap-8 text-[12px] sm:text-[15px] font-light uppercase font-montserrat tracking-[-0.02em] justify-between">
          <span>INVINCIBLE READ</span>
          <span>MOBILE APP</span>
        </div>
      </div>

      <div className="mb-34 z-20 absolute lg:bottom-16 -bottom-[12%] flex flex-col items-center justify-center">
        <p className="text-white text-center">DOWNLOAD FROM</p>
        <div className="flex items-center gap-2 mt-5 flex-col md:flex-row">
          <Link href={"/https://play.google.com/store/apps/details?id=com.invincibleapp.app&pcampaignid=web_share"}>
            <div className="border-[1px] flex gap-2 items-center border-white w-fit rounded-lg px-3 py-2 cursor-pointer">
              <img
                src="/icons/googleplay.svg"
                alt="google play"
                className="h-[25px]"
              />
              <div>
                <span className="text-white leading-none text-[12px] font-thin">
                  GET IT ON
                </span>
                <p className="text-white uppercase text-sm font-semibold leading-none">
                  Google Play
                </p>
              </div>
            </div>
          </Link>
          <div className="border-[1px] flex gap-2 items-center border-white w-fit rounded-lg px-3 py-2 cursor-pointer">
            <img
              src="/icons/apple.svg"
              alt="google play"
              className="h-[25px]"
            />
            <div>
              <span className="text-white leading-none text-[12px] font-thin">
                Coming soon
              </span>
              <p className="text-white uppercase text-sm font-semibold leading-none">
                App Store
              </p>
            </div>
          </div>
          <div className="border-[1px] flex gap-2 items-center border-white w-fit rounded-lg px-3 py-2 cursor-pointer">
            <img src="/icons/tg.svg" alt="google play" className="h-[25px]" />
            <div>
              <span className="text-white leading-none text-[12px] font-thin">
                Coming soon
              </span>
              <p className="text-white uppercase text-sm font-semibold leading-none">
                Telegram Mini App
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Left;
