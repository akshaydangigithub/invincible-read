'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-[6px] sm:gap-[7.41px] cursor-pointer">
      <Image
        src="/owl_straight.svg"
        alt="Owl Logo"
        width={40}
        height={40}
        className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]"
      />
      <div className="text-white">
        <span className="text-[24px] sm:text-[31.77px] font-light font-cormorant uppercase leading-[20px] sm:leading-[24.91px]">
          INVINCIBLE
        </span>
        <span className="block text-[14px] sm:text-[18.10px] font-light font-cormorant uppercase leading-[12px] sm:leading-[13.26px]">
          READ
        </span>
      </div>
    </Link>
  );
};

export default Logo;
