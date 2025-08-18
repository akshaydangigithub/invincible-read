'use client';

import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] bg-[#2B23B8] h-[42px] flex items-center overflow-hidden z-50 px-0">
      <div className="whitespace-nowrap animate-marquee font-montserrat font-bold text-white text-[12px] sm:text-[14px] tracking-wide leading-tight">
        <span className="mx-8">
          LISTING ON MULTIPLE CEX AT THE END OF STAGE 5 — LAST CHANCE TO GRAB YOUR $READ IN THE PRESALE
        </span>
        <span className="mx-8">
          LISTING ON MULTIPLE CEX AT THE END OF STAGE 5 — LAST CHANCE TO GRAB YOUR $READ IN THE PRESALE
        </span>
        <span className="mx-8">
          LISTING ON MULTIPLE CEX AT THE END OF STAGE 5 — LAST CHANCE TO GRAB YOUR $READ IN THE PRESALE
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
