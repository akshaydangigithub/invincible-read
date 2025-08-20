"use client";

import Image from "next/image";

export default function Tokenomics() {
  const tokens = [
    { color: "bg-indigo-800", label: "Private Sale (2.5%)" },
    // { color: 'bg-indigo-800', label: 'Public Sale (0.5%)' },
    { color: "bg-indigo-300", label: "Public Sale (0.5%)" },
    { color: "bg-violet-200", label: "Rewards (35%)" },
    { color: "bg-indigo-400", label: "Marketing & Partnerships (15%)" },
    { color: "bg-indigo-500", label: "Ecosystem Growth & Development (20%)" },
    { color: "bg-indigo-400", label: "Team & Advisor (15%)" },
    // { color: 'bg-violet-300', label: 'Development and Tech Operations (3%)' },
    // { color: 'bg-indigo-500', label: 'Legal Advisors and Surveyors (3%)' },
    // { color: 'bg-indigo-500', label: 'Partnerships (2%)' },
    { color: "bg-indigo-800", label: "Liquidity & Exchange listings (12%)" },
  ];

  return (
    <section className="w-full bg-black px-6 md:px-20 flex flex-col items-center text-white relative">
      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-bold font-['Satoshi'] tracking-tight leading-[72px] text-center mb-16">
        Tokenomics
      </h2>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-16">
        {/* Token Labels */}
        <div className="w-full max-w-[540px] flex flex-col gap-3.5">
          {tokens.map((item, index) => (
            <div key={index} className="inline-flex items-center gap-3.5">
              <div className={`w-14 h-3.5 ${item.color}`} />
              <span className="text-xl font-light font-['Poppins'] capitalize leading-9 tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Donut Graph Image */}
        <div className="w-full max-w-[420px]">
          <Image
            src="/tokenomics_cleaned.png"
            alt="Tokenomics Donut Graph"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Token Info Card */}
      <div className="mt-20 w-full max-w-5xl px-6 py-6 bg-[rgba(50,46,46,0.28)] backdrop-blur-[2.5px] border border-white/30 rounded-[20px] flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0 text-white">
        {/* Contract Address */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base font-semibold">Private Sale Contract Address</p>
          <a
            href="https://bscscan.com/address/0x43A17B4e3053974486EBB10661e5423aD9C8651E#code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm break-all font-mono opacity-80 max-w-[260px] hover:underline hover:opacity-100 transition"
          >
            0x43A17B4e3053974486EBB10661e5423aD9C8651E
          </a>
        </div>

        <div className="hidden sm:block w-[1px] h-14 bg-white/30" />

        {/* Decimal */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base font-semibold">Decimal</p>
          <p className="text-sm opacity-80">18</p>
        </div>

        <div className="hidden sm:block w-[1px] h-14 bg-white/30" />

        {/* Network */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base font-semibold">Network</p>
          <p className="text-sm opacity-80 leading-tight text-center">
            Binance Smart Chain
            <br />
            (BEP20)
          </p>
        </div>

        <div className="hidden sm:block w-[1px] h-14 bg-white/30" />

        {/* Token Symbol */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base font-semibold">Token Symbol</p>
          <p className="text-sm opacity-80">$READ</p>
        </div>
      </div>
    </section>
  );
}
