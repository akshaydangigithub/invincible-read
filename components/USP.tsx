"use client";
import React from "react";
import { motion } from "framer-motion";

const Usp = () => {
  return (
    <div className="w-full max-w-[2262px] relative opacity-95 overflow-hidden pt-16 md:pt-32 pb-5 md:pb-20 px-4 md:px-20">
      {/* Heading - desktop only */}
      <h1 className="hidden md:block text-white text-4xl text-center font-semibold z-30 relative drop-shadow-lg">
        The INVINCIBLE READ is Here!
      </h1>
      {/* Glass strips (desktop only) */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="hidden md:block absolute w-[150.8px] h-full top-0 bg-blend-overlay bg-gradient-to-r from-white/0 via-black/20 to-white/0 backdrop-blur-[141.375px]"
          style={{ left: `${i * 150.8}px` }}
        />
      ))}

      {/* MOBILE ONLY IMAGE + HEADING */}
      <div className="md:hidden flex flex-col items-center mb-10">
        <h1 className="text-white text-2xl text-center font-semibold mt-6">
          The INVINCIBLE READ is Here!
        </h1>
        <img
          src="/iPhone.svg"
          alt="iPhone Showcase"
          className="w-[90vw] mt-8 max-w-[458px] h-auto rounded-[60px] border border-white/10 shadow-2xl"
        />
      </div>

      {/* Content block */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-20 flex flex-col md:flex-row pt-20 justify-center gap-10"
      >
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-16 mt-10 font-montserrat w-full md:w-[600px]">
          {/* Box 1 */}
          <div className="flex flex-col gap-3 items-center md:items-end text-center md:text-right md:pr-2">
            <div className="hidden md:flex justify-end w-full">
              <div className="flex flex-col items-end pr-0">
                <div className="w-[80px] h-px bg-white opacity-40 translate-x-20" />
                <div className="w-px h-[60px] bg-white opacity-40" />
              </div>
            </div>
            <img src="./icon1.svg" alt="Icon" className="w-6 h-6 mt-2 " />
            <div className="text-lg md:text-xl font-montserrat font-semibold uppercase leading-none">
              Trusted <br /> Verification
            </div>
            <div className="text-sm md:text-base text-gray-300">
              Community and publisher-based validation
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col gap-3 items-center md:items-end text-center md:text-right md:pr-2">
            <div className="hidden md:flex justify-end w-full">
              <div className="flex flex-col items-end pr-5">
                <div className="w-[80px] h-px bg-white opacity-40 -mr-20" />
                <div className="w-px h-[60px] bg-white opacity-40" />
              </div>
            </div>
            <img src="./icon5.svg" alt="Icon" className="w-6 h-6 mt-2" />
            <div className="text-lg md:text-xl font-montserrat font-semibold uppercase leading-none">
              Decentralized <br /> Publishing
            </div>
            <div className="text-sm md:text-base text-gray-300">
              Publish without centralized gatekeepers
            </div>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col gap-3 items-center md:items-end text-center md:text-right md:pr-2">
            <div className="hidden md:flex justify-end w-full">
              <div className="flex flex-col items-end pr-5">
                <div className="w-[80px] h-px bg-white opacity-40 -mr-20" />
                <div className="w-px h-[60px] bg-white opacity-40" />
              </div>
            </div>
            <img src="./icon3.svg" alt="Icon" className="w-6 h-6 mt-2" />
            <div className="text-lg md:text-xl font-montserrat font-semibold uppercase leading-none">
              Immutable <br /> Digital Legacy
            </div>
            <div className="text-sm md:text-base text-gray-300">
              Your book lives on the blockchain permanently
            </div>
          </div>
        </div>

        {/* CENTER IMAGE - DESKTOP ONLY */}
        <div className="hidden md:block">
          <img
            src="/iPhone.svg"
            alt="iPhone Showcase"
            className="w-[70vw] max-w-[300px]  h-auto rounded-[60px] border border-white/10 shadow-2xl"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col mt-10 gap-16 font-montserrat w-full md:w-[600px]">
          {/* Box 1 */}
          <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left md:pl-2">
            <div className="hidden md:flex justify-start w-full">
              <div className="flex flex-col items-start pl-5">
                <div className="w-[80px] h-px bg-white opacity-40 -ml-20" />
                <div className="w-px h-[60px] bg-white opacity-40" />
              </div>
            </div>
            <img src="./icon2.svg" alt="Icon" className="w-6 h-6 mt-2" />
            <div className="text-lg md:text-xl font-montserrat font-semibold uppercase leading-none">
              Proof of <br /> Ownership
            </div>
            <div className="text-sm md:text-base text-gray-300">
              Authenticated and timestamped ownership records for authors
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left md:pl-2">
            <div className="hidden md:flex justify-start w-full">
              <div className="flex flex-col items-start pl-5">
                <div className="w-[80px] h-px bg-white opacity-40 -ml-20" />
                <div className="w-px h-[60px] bg-white opacity-40" />
              </div>
            </div>
            <img src="./icon4.svg" alt="Icon" className="w-6 h-6 mt-2" />
            <div className="text-lg md:text-xl font-montserrat font-semibold uppercase leading-none">
              Global <br /> Cataloging
            </div>
            <div className="text-sm md:text-base text-gray-300">
              Universal tracking and reference system
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Usp;
