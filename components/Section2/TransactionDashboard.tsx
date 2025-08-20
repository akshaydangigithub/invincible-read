"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionData } from "@/types/interface";

// Initial data
const initialData: TransactionData[] = [
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xa72b4b5c8d9e2f7a3c1d6e9f8b2a5d7c3e9f1a4b",
    USDT: "125.50",
    READ: "1,250.00",
    date: "7/31/2025, 7:45:22 PM",
  },
  {
    wallet: "0xb83c5c6d9e0f3g8b4d2e7f0c9b3a6e8d4f0g2b",
    USDT: "89.75",
    READ: "897.50",
    date: "7/31/2025, 7:32:15 PM",
  },
  {
    wallet: "0xc94d6d7e0f1g4h9c5e3f8g1d0c4b7f9e5g1h3c6d",
    USDT: "200.00",
    READ: "2,000.00",
    date: "7/31/2025, 7:18:44 PM",
  },
  {
    wallet: "0xd05e7e8f1g2h5i0d6f4g9h2e1d5c8g0f6h2i4d7e",
    USDT: "45.25",
    READ: "452.50",
    date: "7/31/2025, 7:02:33 PM",
  },
  {
    wallet: "0xe16f8f9g2h3i6j1e7g5h0i3f2e6d9h1g7i3j5e8f",
    USDT: "310.80",
    READ: "3,108.00",
    date: "7/31/2025, 6:55:21 PM",
  },
  {
    wallet: "0xf27g9g0h3i4j7k2f8h6i1j4g3f7e0i2h8j4k6f9g",
    USDT: "78.90",
    READ: "789.00",
    date: "7/31/2025, 6:41:18 PM",
  },
  {
    wallet: "0xf27g9g0h3i4j7k2f8h6i1j4g3f7e0i2h8j4k6f9g",
    USDT: "78.90",
    READ: "789.00",
    date: "7/31/2025, 6:41:18 PM",
  },
];

// Dummy transaction generator
const generateRandomTransaction = (): TransactionData => {
  const walletAddresses = [
    "0xe16f8f9g2h3i6j1e7g5h0i3f2e6d9h1g7i3",
    "0xf27g9g0h3i4j7k2f8h6i1j4g3f7e0i2h8j4",
    "0x038h0h1i4j5k8l3g9i7j2k5h4g8f1j3i9k5",
    "0x149i1i2j5k6l9m4h0j8k3l6i5h9g2k4j0l6",
    "0x25aj2j3k6l7m0n5i1k9l4m7j6i0h3l5k1m7",
    "0x36bk3k4l7m8n1o6j2l0m5n8k7j1i4m6l2n8",
    "0x47cl4l5m8n9o2p7k3m1n6o9l8k2j5n7m3o9",
    "0x58dm5m6n9o0p3q8l4n2o7p0m9l3k6o8n4p0",
  ];

  const usdtAmounts = ["25.50", "75.80", "150.00", "89.25", "300.75", "42.10", "180.90", "95.60"];
  const readMultipliers = [8, 10, 12, 15, 20];

  const randomWallet = walletAddresses[Math.floor(Math.random() * walletAddresses.length)];
  const randomUsdt = usdtAmounts[Math.floor(Math.random() * usdtAmounts.length)];
  const multiplier = readMultipliers[Math.floor(Math.random() * readMultipliers.length)];
  const readAmount = (parseFloat(randomUsdt) * multiplier).toFixed(2);

  return {
    wallet: randomWallet,
    USDT: randomUsdt,
    READ: readAmount,
    date: new Date().toLocaleString(),
  };
};

const TransactionDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>(initialData);
  const [newTransactionId, setNewTransactionId] = useState<number>(0);

  // Add new transaction every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = generateRandomTransaction();

      setTransactions(prevTransactions => {
        // Keep only the latest 20 transactions to prevent infinite growth
        const updatedTransactions = [newTransaction, ...prevTransactions].slice(0, 20);
        return updatedTransactions;
      });

      setNewTransactionId(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-6 sm:pt-10 px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Transaction Dashboard</h1>
      <p className="text-center text-white/80 text-base sm:text-lg font-normal mt-3 sm:mt-4 px-4">
        Witness the Momentum. Every Contribution, Secured on Blockchain.
      </p>

      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 mt-6 sm:mt-10 lg:p-8 bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl rounded-[20px]">
        {/* TABLE (responsive with new transaction animations) */}
        <div className="w-full overflow-x-auto -mx-2 sm:mx-0">
          <div className="h-80 sm:h-[25rem] overflow-hidden rounded-lg border border-gray-200 mx-2 sm:mx-0">
            <motion.table
              className="min-w-[320px] sm:min-w-[600px] w-full border-collapse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs text-black font-bold uppercase first:rounded-tl-lg last:rounded-tr-lg">
                    Wallet
                  </th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs text-black font-bold uppercase">
                    USDT
                  </th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs text-black font-bold uppercase">
                    READ
                  </th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs text-black font-bold uppercase first:rounded-tl-lg last:rounded-tr-lg">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-gray-200">
                <AnimatePresence initial={false}>
                  {transactions.map((item: TransactionData, index: number) => (
                    <motion.tr
                      key={`${item.wallet}-${item.date}-${index}`}
                      initial={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        backgroundColor: "rgba(34, 197, 94, 0.2)" // Green flash for new transactions
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        backgroundColor: "transparent"
                      }}
                      exit={{
                        opacity: 0,
                        y: 20,
                        scale: 0.95
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        backgroundColor: { duration: 2 } // Green flash fades over 2 seconds
                      }}
                      layout
                    >
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-[#818CF8] break-words max-w-[120px] sm:max-w-[200px]">
                        <span className="block sm:hidden">
                          {item.wallet.slice(0, 4)}...{item.wallet.slice(-4)}
                        </span>
                        <span className="hidden sm:block">
                          {item.wallet}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-white font-medium">
                        <motion.span
                          initial={{ scale: 1.2, color: "#22c55e" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 1 }}
                        >
                          ${item.USDT}
                        </motion.span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-white font-medium">
                        <motion.span
                          initial={{ scale: 1.2, color: "#22c55e" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 1 }}
                        >
                          {item.READ}
                        </motion.span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-white whitespace-nowrap">
                        <span className="block sm:hidden text-xs">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span className="hidden sm:block">
                          {item.date}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </div>
        </div>

        {/* Live indicator */}
        <div className="md:flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-green-400 text-sm font-medium">Live Transactions</span>
            <span className="text-gray-400 text-xs">({transactions.length} total)</span>
          </div>

          <div className="text-gray-400 text-xs md:mt-0 mt-3">
            Updates every 4 seconds
          </div>
        </div>

        {/* Button */}
        <button className="mt-4 sm:mt-5 block mx-auto px-8 sm:px-10 lg:px-32 cursor-pointer uppercase py-2 sm:py-2 text-sm sm:text-base bg-[#2B2B2B] text-white rounded-full">
          Transaction Dashboard
        </button>
      </div>
    </div>
  );
};

export default TransactionDashboard;