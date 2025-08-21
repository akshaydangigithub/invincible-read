"use client";

import Link from "next/link";
import React from "react";

const NavLinks: React.FC = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Tokenomics", href: "/#tokenomics" },
    { label: "White-Paper", href: "https://invincibles-organization.gitbook.io/invincible-read-whitepaper", newTab: true },
    { label: "Events", href: "/archives" },
  ];

  return (
    <div className="hidden lg:flex items-center gap-[12.54px]">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          target={link.newTab ? "_blank" : "_self"}
          className={`px-[14.22px] py-[12.54px] rounded-full text-white text-[18.13px] font-montserrat capitalize leading-[14.64px]
            transition-all duration-300 ease-in-out
            hover:bg-white hover:text-black
          `}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
