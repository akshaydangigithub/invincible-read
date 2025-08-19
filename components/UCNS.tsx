"use client";

import React from "react";
import Image from "next/image";

const UCNS: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-20 py-24 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="w-full max-w-[1546px] px-4 sm:px-10 py-8 bg-white/5 rounded-xl outline-1 outline-offset-[-1px] outline-white/20 backdrop-blur-[30.90px] flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-white text-[54px] sm:text-[85px] md:text-[120px] lg:text-[154.47px] font-semibold font-['Cormorant_SC'] uppercase leading-none text-center lg:text-left">
          UCNS
        </div>
        <div className="w-full max-w-[475px] text-white text-2xl sm:text-4xl lg:text-6xl font-light font-['Cormorant_SC'] lowercase text-center leading-[1]">
          Universal Content Numbering System
        </div>
      </div>

      {/* Pills Row */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pb-20">
        {/* Line (visible only on desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-white z-0 lg:top-1/2 lg:left-0 lg:w-full lg:h-[2px]" />

        <div className="flex flex-col lg:flex-row justify-between relative z-10 gap-20 lg:gap-0">
          <Node
            icon="/icons/ucns/0.svg"
            title="OWNERSHIP PROOF"
            desc="Authors receive verifiable on-chain proof of origin. Content timestamping is also provided."
            position="top"
          />
          <Node
            icon="/icons/ucns/1.svg"
            title="TRUE DIGITAL LEGACY"
            desc="Books live securely and eternally on the blockchain. Authors are always credited for their work."
            position="bottom"
          />
          <Node
            icon="/icons/ucns/2.svg"
            title="VERIFIED LAYERS"
            desc="Publishers and validators verify new content easily. Trust and transparency are ensured."
            position="top"
          />
          <Node
            icon="/icons/ucns/3.svg"
            title="GLOBAL CATALOGUING"
            desc="Readers and libraries can discover and trace books globally, enabled by seamless UCNS tracking."
            position="bottom"
          />
          <Node
            icon="/icons/ucns/4.svg"
            title="DECENTRALIZED PUBLISHING"
            desc="Books live securely and eternally on blockchain. Authors are always credited for their work."
            position="top"
          />
        </div>
      </div>
    </div>
  );
};

type NodeProps = {
  icon: string;
  title: string;
  desc: string;
  position: "top" | "bottom";
};

const Node: React.FC<NodeProps> = ({ icon, title, desc, position }) => {
  const isTop = position === "top";

  return (
    <div className="flex flex-col items-center text-center w-full lg:w-1/5">
      {/* Desktop Zig-Zag Layout */}
      <div
        className={`hidden lg:flex flex-col items-center ${
          isTop ? "mb-20" : "mt-24"
        }`}
      >
        {isTop && (
          <>
            <h3 className="text-white text-lg font-bold font-['Cormorant_SC'] uppercase leading-tight">
              {title}
            </h3>
            <p className="text-white text-sm font-light font-['Montserrat'] mt-1 max-w-[200px]">
              {desc}
            </p>
            <div className="w-[2px] h-10 bg-white" />
            <div className="w-2 h-2 bg-white rounded-full mb-2" />
          </>
        )}

        <div className="relative w-28 h-12 bg-black/40 rounded-[41.56px] outline-[2.5px] outline-white backdrop-blur-md flex justify-center items-center z-10">
          <Image
            src={icon}
            alt={title}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        {!isTop && (
          <>
            <div className="w-2 h-2 bg-white rounded-full mt-2" />
            <div className="w-[2px] h-10 bg-white" />
            <h3 className="text-white text-lg font-bold font-['Cormorant_SC'] uppercase leading-tight mt-2">
              {title}
            </h3>
            <p className="text-white text-sm font-light font-['Montserrat'] mt-1 max-w-[200px]">
              {desc}
            </p>
          </>
        )}
      </div>

      {/* Mobile Vertical Layout */}
      <div className="flex flex-col items-center lg:hidden gap-4">
        <div className="relative w-24 h-10 bg-black/40 rounded-full outline-2 outline-white backdrop-blur-md flex justify-center items-center">
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <h3 className="text-white text-base font-bold font-['Cormorant_SC'] uppercase">
          {title}
        </h3>
        <p className="text-white text-sm font-light font-['Montserrat'] max-w-xs">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default UCNS;
