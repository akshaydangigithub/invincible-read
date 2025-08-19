"use client";

import React, { useEffect, useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const ReferAndEarn = () => {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  const [referralCode, setReferralCode] = useState<string>("------");
  const [referralLink, setReferralLink] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [linkGenerated, setLinkGenerated] = useState(false);

  // Safely get window.location.origin on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleCopy = async () => {
    const textToCopy = linkGenerated
      ? referralLink
      : `${origin}/${referralCode}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateLink = async () => {
    if (!isConnected || !address || !origin) return;

    const normalized = address.toLowerCase();
    const code = `${normalized.slice(0, 2)}${normalized.slice(-3)}`;
    setReferralCode(code);

    const link = `${origin}/${code}`;
    setReferralLink(link);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: normalized,
          referralCode: code,
        }),
      });
      setLinkGenerated(true);
    } catch (error) {
      console.error("Error saving referral:", error);
    }
  };

  return (
    <section className="relative w-full text-white overflow-hidden py-20 px-4 sm:px-10">
      <h2 className="text-center font-montserrat font-medium text-[48px] sm:text-[60px] leading-[72px] tracking-wide uppercase mb-10">
        Refer & <span className="font-bold">EARN</span>
      </h2>

      <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-14 max-w-[1200px] mx-auto relative z-10">
        {/* Left Card */}
        <div className="relative bg-[#030100] rounded-[25px] w-full max-w-[600px] overflow-hidden p-6 pt-20 pb-12 border border-white/30">
          <div className="absolute w-96 h-96 bg-custom-indigo blur-xl -top-50 -left-60 rounded-full z-20" />
          <div className="absolute inset-0 z-0">
            <img
              src="/refer_bg.jpg"
              alt="Refer background"
              className="object-cover"
            />
          </div>

          {/* Owl Image */}
          <div className="absolute w-[260px] h-[260px] rounded-full bottom-[-110px] right-[6px] flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2B23B8] via-[#7366E8] to-transparent opacity-60 blur-2xl z-0" />
            <div className="absolute inset-0 rounded-full border-4 border-[#AAAFFF] border-opacity-60 bg-[#2B23B8] z-10" />
            <div className="relative z-20 flex items-center justify-center w-full h-full">
              <img
                src="/owl_big.svg"
                alt="Owl"
                width={160}
                height={90}
                className="object-contain"
              />
            </div>
          </div>

          {/* Connect Wallet */}
          <div
            className="absolute top-6 left-6 bg-white rounded-full px-4 py-2 cursor-pointer z-20"
            onClick={() =>
              open({
                view: isConnected ? "Account" : "Connect",
                namespace: "eip155",
              })
            }
          >
            <span className="text-[#2B23B8] text-[13px] font-montserrat font-semibold uppercase">
              {isConnected && address
                ? `${address.slice(0, 6)}…${address.slice(-4)}`
                : "Connect Wallet"}
            </span>
          </div>

          {/* Referral Info */}
          <div className="relative z-20 mt-4">
            <p className="font-montserrat font-light text-[20px] text-white/80 leading-[26px] max-w-[395px] mb-6">
              Invite friends. Earn <strong>$READ</strong> tokens. Grow the Web3 reading revolution.

            </p>

            {isConnected && !linkGenerated && (
              <button
                onClick={handleGenerateLink}
                className="mb-4 bg-[#2B23B8] text-white px-6 py-3 rounded-[11px] font-montserrat text-[16px]"
              >
                Generate Referral Link
              </button>
            )}

            {linkGenerated ? (
              <>
                <p className="text-white text-[13px] font-poppins mb-1">
                  Your Referral Link
                </p>
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full h-[40px] rounded-full border border-white px-4 bg-white text-black text-sm font-montserrat"
                />
              </>
            ) : (
              <>
                <p className="text-white text-[13px] font-poppins mb-1">
                  Your Referral Code
                </p>
                <input
                  type="text"
                  readOnly
                  value={origin ? `${origin}/${referralCode}` : ""}
                  className="w-full h-[40px] rounded-full border border-white px-4 bg-white text-black text-sm font-montserrat"
                />
              </>
            )}

            <button
              onClick={handleCopy}
              className="mt-6 bg-[#2B23B8] text-white px-6 py-3 rounded-[11px] font-montserrat flex items-center gap-3 text-[16px]"
            >
              <img src="/icons/copy.svg" alt="Copy" width={16} height={16} />
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative backdrop-blur-2xl bg-black/10 border border-white/30 rounded-[25px] w-full max-w-[600px] p-6 pt-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-[20px] font-light tracking-wide text-white/70">
                The top five users who refer the most will have a chance to win
                an extra
              </p>
              <p className="text-[28px] font-bold">Upto 15% in USDT</p>
            </div>

            <div className="bg-[#2B23B8] rounded-[12px] p-4 flex flex-col items-center gap-2">
              <p className="text-[16px] font-medium">
                <span className="font-bold">10%</span> bonus on every successful
                referral purchase
              </p>
              <hr className="border-white w-[252px]" />
              <p className="text-[16px] font-medium">
                Leaderboard for top referrers
              </p>
              <p>
                (Top <span className="font-bold">5</span> get USDT bonuses up to{" "}
                <span className="font-bold">15%</span>)
              </p>
              <hr className="border-white w-[252px]" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">Auto-generate</span> referral code
                upon wallet connect
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferAndEarn;
