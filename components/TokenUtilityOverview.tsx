"use client";

import React from "react";
import Image from "next/image";

const TokenUtilityOverview: React.FC = () => {
  const features = [
    {
      icon: "/icons/learn.svg",
      title: "Learn-to-Earn System",
      desc: "Users earn $READ for completing books and quizzes",
    },
    {
      icon: "/icons/reward.svg",
      title: "Reward Engine",
      desc: "Performance-based token payouts for learners, reviewers, and authors",
    },
    {
      icon: "/icons/loyalty.svg",
      title: "Custom Loyalty Programs",
      desc: "Educational orgs or publishers can design rewards (e.g. course credits, NFT badges, DAO boosts)",
    },
    {
      icon: "/icons/tracker.svg",
      title: "Live Skill Tracker",
      desc: "Real-time credential updates and leaderboard achievements.",
    },
  ];

  return (
    <section className="md:w-full w-[90%] max-w-[1110px] mx-auto bg-neutral-900 rounded-[40px] border-l border-t border-white/30 overflow-hidden px-4 sm:px-6 py-10 flex flex-col items-center gap-12">
      {/* Headings */}
      <div className="text-center max-w-4xl">
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-medium font-montserrat uppercase leading-tight tracking-tight">
          Seamless Entry
        </h2>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold font-montserrat uppercase leading-tight tracking-tight">
          Limitless Learning
        </h2>
      </div>

      {/* Subheading */}
      <p className="text-white text-base sm:text-lg md:text-xl font-light font-poppins leading-relaxed tracking-tight text-center max-w-3xl px-2">
        Here at Invincible Read, we’re dedicated to making education accessible
        for everyone — from anywhere in the world. We’re creating an opportunity
        for everyone with our read to earn platform that pays out for what users
        know and learn.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full px-2">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-4 items-start">
            <div className="w-12 h-12">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-white text-base font-bold font-montserrat uppercase leading-tight tracking-tight">
              {feature.title}
            </h3>
            <p className="text-white text-xs font-light font-montserrat leading-tight tracking-tight">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Token Utility Block */}
      <div className="flex flex-col lg:flex-row gap-8 w-full justify-between px-2">
        {/* $READ Token Info */}
        <div className="relative bg-black rounded-3xl p-6 flex-1 flex flex-col items-center overflow-hidden">
          {/* Glow effect */}
          <div className="absolute w-96 h-96 bg-custom-indigo blur-xl -top-50 -left-60 rounded-full z-0" />

          <h3 className="relative text-white text-4xl sm:text-5xl font-bold font-montserrat text-center mb-6 z-10">
            $READ Token
          </h3>
          <p className="relative text-zinc-300 text-sm font-light font-montserrat leading-relaxed text-center z-10 mb-6 px-2">
            The $READ token fuels every interaction on Invincible Read—rewarding
            readers, boosting platform partnerships, and unlocking token-based
            benefits like voting, exclusive content access, and creator
            royalties.
          </p>

          {/* Semicircle container */}
          {/* <div className="flex flex-col p-2 z-20"> */}

          <div className="relative w-full max-w-[500px] aspect-[2/1] mt-auto ">
            {/* Outer Glow Border */}
            <div className="absolute bottom-0 left-0 w-full h-full rounded-t-full bg-gradient-to-t from-[#2B23B8] via-[#7366E8] to-transparent opacity-90 blur-3xl z-0" />

            {/* Inner Clean Border */}
            <div className="absolute bottom-0 left-0 w-full h-full rounded-t-full border-t-8 border-l-8 border-r-8 border-[#AAAFFF] border-opacity-60 bg-custom-indigo z-10" />

            {/* Owl */}
            <div className="absolute inset-0 flex items-end justify-center z-20 overflow-hidden">
              <img
                src="/owl_big.svg"
                alt="Half Owl"
                className="w-[180px] sm:w-[250px] md:w-[250px] h-auto -mb-[4rem] object-contain"
              />
            </div>
          </div>

          {/* </div> */}
        </div>

        {/* Utility Cards */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Gated Content Card */}
          <div className="relative bg-[#2B23B8] rounded-[25px] w-full h-[190px] px-6 py-4 overflow-hidden">
            <h4 className="absolute right-6 top-6 text-white text-[25.6px] leading-[31px] font-bold font-montserrat w-[60%] text-right capitalize z-10">
              Access to gated content and tools
            </h4>
            <img
              src="/gated.png"
              alt="Gated Content Illustration"
              className="absolute -left-[10%] top-1/2 rotate-[15.67deg] w-[120%] md:w-[100%] h-auto z-0"
            />
          </div>

          {/* Utility List Cards */}
          <div className="bg-black rounded-3xl p-6 flex flex-wrap gap-4 justify-center sm:justify-start">
            {[
              "Soulbound credential issuance",
              "DAO voting power",
              "Licensing & content resale automation",
              "Staking for bonuses & early access",
            ].map((text, i) => (
              <div
                key={i}
                className="flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] bg-stone-950 rounded-[10px] py-6 px-4 text-center text-white text-sm font-light font-poppins"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenUtilityOverview;
