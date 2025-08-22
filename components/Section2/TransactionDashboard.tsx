"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionData } from "@/types/interface";
import Link from "next/link";
import { DepositEvent, fetchTxs } from "@/api/fetchTxs";

// Updated interface to match the event data structure
interface EventData {
  address: string;
  usdt: number;
  read: number;
  pricePerToken: number;
  timestamp: string;
  ts: number;
  tx: string;
  contract: string;
}

// Function to convert event data to transaction data format
const convertEventToTransaction = (event: EventData): TransactionData => {
  return {
    wallet: event.address,
    USDT: event.usdt.toFixed(2),
    READ: event.read.toFixed(2),
    date: event.timestamp,
    tx: event.tx,
  };
};

const TransactionDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [txs, setTxs] = useState<DepositEvent[]>([]);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const data = await fetchTxs();
      setTxs(data);

      const eventsV2 = data.filter((e) => e.contract === "V2");

      if (eventsV2.length > 0) {
        const convertedTransactions = eventsV2.map(event =>
          convertEventToTransaction({
            address: event.address || "0x",
            usdt: event.usdt || 0,
            read: event.read || 0,
            pricePerToken: event.pricePerToken || 0,
            timestamp: event.timestamp || new Date().toLocaleString(),
            ts: event.ts || Date.now(),
            tx: event.tx || "",
            contract: event.contract || "V2",
          })
        );

        convertedTransactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(convertedTransactions);
      }
      // ⬆️ don’t wipe transactions when API gives empty array
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // maybe keep showing old data instead of wiping
    } finally {
      setLoading(false);
    }
  };


  // Initial fetch
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Refetch data every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // const eventsV2 = txs.filter((e) => e.contract === 'V2');
  // console.log('Events V2:', eventsV2);

  return (
    <div className="pt-6 sm:pt-10 px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Transaction Dashboard</h1>
      <p className="text-center text-white/80 text-base sm:text-lg font-normal mt-3 sm:mt-4 px-4">
        Witness the Momentum. Every Contribution, Secured on Blockchain.
      </p>

      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 mt-6 sm:mt-10 lg:p-8 bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl rounded-[20px]">
        {/* TABLE (responsive with animations) */}
        <div className="w-full overflow-x-auto -mx-2 sm:mx-0">
          <div className="h-96 sm:h-[31rem] overflow-y-auto rounded-lg border border-gray-200 mx-2 sm:mx-0">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-white/80 text-sm">Fetching data...</p>
                </div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/80 text-sm">No data found</p>
              </div>
            ) : (
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
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs text-black font-bold uppercase first:rounded-tl-lg last:rounded-tr-lg">
                      Tx
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
                          backgroundColor: "rgba(34, 197, 94, 0.2)"
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
                          backgroundColor: { duration: 2 }
                        }}
                        layout
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs text-[#818CF8] break-words max-w-[120px] sm:max-w-[200px]">
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
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-blue-400 underline">
                          <a href={`https://bscscan.com/tx/${item.tx}`} target="_blank" rel="noopener noreferrer">
                            View Tx
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </motion.table>
            )}
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
          </div>
          <div className="text-gray-400 text-xs md:mt-0 mt-3">
            Updates every 4 seconds
          </div>
        </div>

        {/* Button */}
        <Link href={"/transaction"}>
          <button className="mt-4 sm:mt-5 block mx-auto px-8 sm:px-10 lg:px-32 cursor-pointer uppercase py-2 sm:py-2 text-sm sm:text-base bg-[#2B2B2B] text-white rounded-full">
            Transaction Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionDashboard;