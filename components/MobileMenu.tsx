"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaDiscord, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaMedium, FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";

const socialIcons = [
  {
    icon: <FaTelegram className="h-5 w-5 cursor-pointer hover:text-[#28A8E9] duration-100" />,
    link: "https://t.me/invincible_read",
  },
  {
    icon: <FaLinkedin className="h-5 w-5 cursor-pointer hover:text-[#0A66C2] duration-100" />,
    link: "https://www.linkedin.com/company/invincibleread/?viewAsMember=true",
  },
  {
    icon: <FaDiscord className="h-5 w-5 cursor-pointer hover:text-[#5865F2] duration-100" />,
    link: "https://discord.gg/jGtrk7TejJ",
  },
  {
    icon: <FaSquareXTwitter className="h-5 w-5 cursor-pointer hover:text-[#ccc] duration-100" />,
    link: "https://x.com/invincible_read",
  },
  {
    icon: <FaMedium className="h-5 w-5 cursor-pointer hover:text-[#ccc] duration-100" />,
    link: "https://medium.com/@invincibleread",
  },
  {
    icon: <FaInstagram className="h-5 w-5 cursor-pointer hover:text-[#FF03BC] duration-100" />,
    link: "https://www.instagram.com/invincibleread/?hl=en",
  },
];

const link = [
  { label: "Home", href: "/" },
  { label: "Tokenomics", href: "/" },
  { label: "White-Paper", href: "/" },
  { label: "Events", href: "/" },
];
const Menu = () => {

  return (
    <div className="bg-white/30 w-44 p-2 overflow-hidden backdrop-blur-xs rounded-lg top-0 right-0">
      <div>
        {link.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              className={`block rounded-lg cursor-pointer p-2 ${index == 0 && "bg-[#2B23B8] border border-white/50"
                }`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      <div
        style={{ boxShadow: "0px 45.44px 67.26px 0px #0000001A" }}
        className="bg-[#5B5B5B24] w-fit flex gap-5 items-center rounded-lg p-3 mt-2"
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
  );
};

const WebSocialIcons = () => {
  return (
    <div
      style={{ boxShadow: "0px 45.44px 67.26px 0px #0000001A" }}
      className="bg-[#5B5B5B24] w-fit flex gap-5 items-center flex-col rounded-lg p-3 mt-2 me-2"
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
  );
};

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {isDesktop ? <WebSocialIcons /> : <Menu />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div
        className={`h-14 rounded-full w-14 cursor-pointer flex items-center justify-center p-3 shadow-2xl shadow-white ${menuOpen ? "bg-white" : "bg-[#2B23B8]"
          }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <IoClose className="text-[#2B23B8] text-2xl" />
        ) : (
          <img
            src="/owl_straight.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
