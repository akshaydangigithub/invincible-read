"use client";

import React from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const NavButtons: React.FC = () => {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  const label =
    isConnected && address
      ? `${address.slice(0, 6)}…${address.slice(-4)}`
      : "Connect Wallet";

  return (
    <div className="flex items-center gap-3">
      <div
        className="px-4 sm:px-[31.78px] py-2.5 sm:py-[12.54px] bg-white rounded-full flex items-center cursor-pointer whitespace-nowrap"
        onClick={() =>
          open({
            view: isConnected ? "Account" : "Connect",
            namespace: "eip155",
          })
        }
      >
        <span className="text-[#2B23B8] text-xs sm:text-[11.15px] font-montserrat font-semibold uppercase">
          {label}
        </span>
      </div>

      <div className="px-4 sm:px-[31.78px] py-2.5 sm:py-[12.54px] bg-[#2B23B8] rounded-full flex items-center cursor-pointer hover:bg-[#2c26a0] duration-200">
        <span className="text-white text-xs sm:text-[11.15px] font-montserrat font-semibold uppercase">
          SIGN UP
        </span>
      </div>
    </div>
  );
};

export default NavButtons;
