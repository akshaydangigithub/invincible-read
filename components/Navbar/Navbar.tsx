import React from "react";
import NavLinks from "./NavLinks";
import NavButtons from "./NavButtons";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="rounded-full flex items-center justify-between bg-white/10 backdrop-blur-lg max-w-[1559px] mt-3 md:px-6 px-4 md:py-4 py-2 border border-white/30 fixed z-50 sm:w-[90%] w-[95%] left-1/2 transform -translate-x-1/2 ">
      <Link href={"/"}>
        <img src="/logo.png" alt="logo" className="md:w-[210px] w-[160px]" /></Link>
      <NavLinks /> {/* Full links on desktop, hidden on mobile */}
      <NavButtons />
    </div>
  );
};

export default Navbar;
