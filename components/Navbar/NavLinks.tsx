"use client";

import React from "react";

const NavLinks: React.FC = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Tokenomics", href: "/#tokenomics" },
    { label: "White-Paper", href: "/" },
    { label: "Events", href: "/archives" },
  ];

  return (
    <div className="hidden md:flex items-center gap-[12.54px]">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          className={`px-[14.22px] py-[12.54px] rounded-full text-white text-[18.13px] font-montserrat capitalize leading-[14.64px]
            transition-all duration-300 ease-in-out
            hover:bg-white hover:text-black
          `}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;
