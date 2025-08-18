'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { parseUnits, formatUnits } from "viem";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useChainId,
  useConnect,
} from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { ToastContainer, toast } from "react-toastify";
import { config } from "../../config";
import { injected } from 'wagmi/connectors';

/** -------------------------------
 *  Network + Contracts
 *  ------------------------------- */
const USDT_ADDRESS = {
  56: "0x55d398326f99059fF775485246999027B3197955", // BSC
  1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",  // Ethereum
  137: "0x3813e82e6f7098b9583FC0F33a962D02018B6803"  // Polygon
} as const;

const USDT_ABI = [
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

// V2 contract (also surfaces V1 totals)
const V2_ADDRESS = "0x43A17B4e3053974486EBB10661e5423aD9C8651E";

const V2_ABI = [
  {
    type: "function",
    name: "deposit",
    inputs: [{ name: "usdtAmount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getTotalTokensSoldV1",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalTokensPromised",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const;

/** -------------------------------
 *  Presale / UI Constants
 *  ------------------------------- */
const GOAL_TOKENS = 8_500_000;        // READ goal
const CURRENT_PRICE_PER_READ = 0.16;  // current tier
const NEXT_PRICE_PER_READ = 0.21;     // next tier

const MIN_INVESTMENT = 10;
const MAX_INVESTMENT = 100000;
const DECIMALS = 18; // READ + USDT on BSC use 18

const InvestmentCard: React.FC = () => {
  const [usdtAmount, setUsdtAmount] = useState<number>(MIN_INVESTMENT);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokensSold, setTokensSold] = useState<number | null>(null);

  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { connect } = useConnect();
  const { writeContractAsync } = useWriteContract();

  // --- Read totals from V2 (covers V1 + V2) ---
  const { data: v1TokensSoldRaw } = useReadContract({
    address: V2_ADDRESS,
    abi: V2_ABI,
    functionName: "getTotalTokensSoldV1",
  });

  const { data: v2TokensSoldRaw } = useReadContract({
    address: V2_ADDRESS,
    abi: V2_ABI,
    functionName: "totalTokensPromised",
  });

  // Combine totals for progress
  useEffect(() => {
    const v1 = v1TokensSoldRaw ? Number(formatUnits(v1TokensSoldRaw as bigint, DECIMALS)) : 0;
    const v2 = v2TokensSoldRaw ? Number(formatUnits(v2TokensSoldRaw as bigint, DECIMALS)) : 0;
    setTokensSold(v1 + v2);
  }, [v1TokensSoldRaw, v2TokensSoldRaw]);

  const readTokens = Math.floor(usdtAmount / CURRENT_PRICE_PER_READ);
  const progress = tokensSold !== null ? Math.min((tokensSold / GOAL_TOKENS) * 100, 100) : 0;

  const handleSliderChange = (val: number) => {
    setUsdtAmount(val);
    setCustomAmount("");
    setError(null);
  };

  const handleCustomInput = (val: string) => {
    setCustomAmount(val);
    if (val === "") return setError(null);
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return setError(null);
    if (parsed < MIN_INVESTMENT) {
      setError(`Minimum investment is $${MIN_INVESTMENT}`);
    } else if (parsed > MAX_INVESTMENT) {
      setError(`Max allowed is $${MAX_INVESTMENT}`);
    } else {
      setError(null);
      setUsdtAmount(parsed);
    }
  };

  const handleBuy = async () => {
    if (!isConnected || !address) return toast.warning("🔌 Connect your wallet");
    if (usdtAmount < MIN_INVESTMENT) return toast.error(`Minimum investment is $${MIN_INVESTMENT}`);

    const usdtAddress = USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS];
    if (!usdtAddress) return toast.error("Unsupported network");

    try {
      setLoading(true);
      const value = parseUnits(usdtAmount.toString(), DECIMALS);

      // 1) Approve USDT spend to V2
      const approveHash = await writeContractAsync({
        address: usdtAddress,
        abi: USDT_ABI,
        functionName: "approve",
        args: [V2_ADDRESS, value],
      });

      toast.info("📝 Approval pending...");
      const approveReceipt = await waitForTransactionReceipt(config, {
        hash: approveHash,
        chainId,
      });
      if (approveReceipt.status !== "success") throw new Error("Approval transaction failed");
      toast.success("✅ Approved successfully!");

      // 2) Deposit USDT into V2
      const depositHash = await writeContractAsync({
        address: V2_ADDRESS,
        abi: V2_ABI,
        functionName: "deposit",
        args: [value],
      });

      toast.info("💸 Deposit in progress...");
      const depositReceipt = await waitForTransactionReceipt(config, {
        hash: depositHash,
        chainId,
      });
      if (depositReceipt.status !== "success") throw new Error("Deposit transaction failed");

      toast.success(`🎉 You bought ${readTokens} $READ at $${CURRENT_PRICE_PER_READ.toFixed(2)}/READ`);

      // optional referral callback
      const referralCode = localStorage.getItem("referralCode");
      if (referralCode && address) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals/bonus`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerAddress: address,
            purchaseAmount: usdtAmount,
            referralCode,
            transactionHash: depositHash,
            pricePerToken: CURRENT_PRICE_PER_READ,
          }),
        }).catch(() => { });
      }
    } catch (err) {
      const e = err as Error & { shortMessage?: string };
      console.error("❌ TX Failed:", e);
      const msg = e.shortMessage || e.message || "Something went wrong.";
      toast.error(`❌ ${msg.includes("insufficient") ? "Insufficient balance" : msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 md:px-0 relative ">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="w-full max-w-6xl mx-auto p-6 sm:p-8  bg-[#00000036] bg-color-grey-7 rounded-[20px] border border-storck/30">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex-1 text-white font-montserrat space-y-4  max-h-[580px]">
            <h2 className="text-xl sm:text-2xl font-medium">Investment</h2>
            <p className="text-sm">Min: $10 – Max: $100,000</p>

            {/* Current price */}
            <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded">
              <span>Current Presale Price</span>
              <strong>${CURRENT_PRICE_PER_READ.toFixed(2)} / READ</strong>
            </div>

            <label className="text-sm mt-2">Use slider:</label>
            <input
              type="range"
              min={MIN_INVESTMENT}
              max={MAX_INVESTMENT}
              step={10}
              value={usdtAmount}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full"
            />

            <div className="flex flex-col gap-1 mt-2 text-sm">
              <div className="flex justify-between">
                <span>USDT:</span>
                <strong>${usdtAmount}</strong>
              </div>
              <div className="flex justify-between">
                <span>$READ:</span>
                <strong>{readTokens}</strong>
              </div>
              <div className="text-white/70 text-xs text-right italic">
                {usdtAmount} ÷ {CURRENT_PRICE_PER_READ} = {readTokens} $READ
              </div>
            </div>

            <label className="text-sm mt-4">Or enter custom amount:</label>
            <input
              type="number"
              inputMode="decimal"
              value={customAmount}
              onChange={(e) => handleCustomInput(e.target.value)}
              className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
              placeholder="Enter amount in USDT"
            />
            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}

            {/* Progress / Sold */}
            <div className="mt-6">
              <div className="text-sm font-medium mb-1 text-center">
                {tokensSold === null ? (
                  <span className="flex justify-center items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Loading total sold...
                  </span>
                ) : (
                  <>
                    {tokensSold.toLocaleString()} / {GOAL_TOKENS.toLocaleString()} $READ Sold
                  </>
                )}
              </div>
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-white/60 mt-4 text-center sm:text-left">
              Funds are securely deposited on-chain. Tokens will be distributed at TGE.
            </p>

            {!isConnected ? (
              <button
                onClick={() => connect({ connector: injected() })}
                className="mt-6 w-full bg-indigo-800 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={handleBuy}
                disabled={loading}
                className="mt-6 w-full bg-indigo-800 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `BUY $READ (${readTokens})`
                )}
              </button>
            )}
          </div>

          {/* Right Panel — restored styling & content */}
          <div className="flex-1 bg-color-grey-20-65%/60 rounded-[19px] p-6 border-2 overflow-hidden border-white/50 text-white font-montserrat max-h-[580px]">

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Image src="/owl_straight.svg" alt="Tier Logo" width={20} height={20} className="w-5 h-5" />
                </div>
                Private Sale Tier 1
              </h3>
            </div>

            <div className="bg-black rounded-[19px] p-4">
              <ul>
                <li className="list-disc list-inside">1% $READ bonus for maintaining learning streaks</li>
                <li className="list-disc list-inside">Eligible for Invincible DAO giveaways</li>
                <li className="list-disc list-inside">Dedicated onboarding support</li>
                <li className="list-disc list-inside">Priority publishing accesst</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center mt-5">
              Presale Tier 2 – Coming Soon
            </h3>

            <p className="text-white/80 text-center mt-3 text-lg font-normal">Price changes to $0.16</p>

            <img
              src="./section2/blue_token.png"
              alt="Blue Token"
              className="w-96 h-96 mx-auto mt-10"
            />

          </div>
          {/* End Right Panel */}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
