import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavButtons from "./NavButtons";

const Navbar = () => {
  return (
    <div className="rounded-full flex items-center justify-between bg-white/10 backdrop-blur-lg max-w-[1559px] mt-3 px-6 py-4 border border-white/30 fixed z-50 w-[90%] left-1/2 transform -translate-x-1/2 ">
      <Logo />
      <NavLinks /> {/* Full links on desktop, hidden on mobile */}
      <NavButtons />
    </div>
  );
};

export default Navbar;
