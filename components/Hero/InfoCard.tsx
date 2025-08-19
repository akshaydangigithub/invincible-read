"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaDiscord, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa";

const socialIcons = [
  {
    icon: <FaTelegram className="h-7 w-7 cursor-pointer" />,
    link: "https://t.me/invincible_read",
  },
  {
    icon: <FaLinkedin className="h-7 w-7 cursor-pointer" />,
    link: "https://www.linkedin.com/company/invincibleread/?viewAsMember=true",
  },
  {
    icon: <FaDiscord className="h-7 w-7 cursor-pointer" />,
    link: "https://discord.gg/jGtrk7TejJ",
  },
  {
    icon: <FaTwitter className="h-7 w-7 cursor-pointer" />,
    link: "https://x.com/invincible_read",
  },
];

const InfoCard = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const end = new Date("2025-09-01T00:00:00");
    const timer = setInterval(() => {
      const current = new Date();
      const diff = end.getTime() - current.getTime();

      if (diff <= 0) {
        setCountdown("00d 00h 00m 00s");
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${d.toString().padStart(2, "0")}d ${h.toString().padStart(2, "0")}h ${m
          .toString()
          .padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl p-6 text-white bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl -mt-16 relative z-10">
      <div className="flex items-start justify-between flex-col md:flex-row">
        <h1 className="md:text-[64px] text-[40px] leading-none uppercase">
          <span className="font-bold">Worlds first web3</span> <br className="md:visible hidden" />
          Publishing company
        </h1>

        <div
          style={{
            boxShadow: "0px 45.44px 67.26px 0px #0000001A",
          }}
          className="bg-[#5B5B5B24] w-fit flex gap-5 items-center rounded-lg p-3 md:mt-0 mt-5"
        >
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="w-full md:grid grid-cols-12">
        <div className="w-full col-span-7">
          <p className="mt-3 text-white/80">
            India’s leading platform with 2000+ authors & 500+ influencer books,
            now launching $READ Token.
          </p>
          <button className="bg-[#3730A3] to-white cursor-pointer rounded-full mt-4 py-2 w-[80%] hover:bg-[#2b257f] duration-300">
            BUY NOW
          </button>
          <a target="_blank" href={"https://invincibles-organization.gitbook.io/invincible-read-whitepaper"}>
            <button className="border-[1px] cursor-pointer border-white rounded-full py-2 mt-2 px-16 hover:bg-white hover:text-black duration-300">
              VIEW WHITE-PAPER
            </button>
          </a>
          <div className="mt-6 text-indigo-400 text-sm sm:text-base font-mono tracking-widest uppercase">
            <p>Presale Tier 1 Ends in: {countdown}</p>
            <p className="animate-pulse mt-2">
              Current stage price: $0.16/READ &nbsp;&nbsp;|&nbsp;&nbsp; Next
              stage price: $0.21/READ
            </p>
          </div>
        </div>

        <div className="w-full col-span-5 md:pt-3 pt-10 flex flex-col md:items-end">
          <div className="flex justify-center items-center gap-4 sm:gap-10 text-white font-semibold text-base sm:text-md uppercase">
            {["Audited", "Secured", "Verified"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span>{label}</span>
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* 🔒 Logo */}
          <a
            href="/invi_audit_report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="h-auto mt-2 block"
          >
            <img
              src="/certik.png"
              alt="Audit Logo"
              className="w-[200px] sm:w-[300px] object-cover"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
