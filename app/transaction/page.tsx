'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACT_ABI } from '@/constants';
import { DepositEvent, fetchTxs } from '@/api/fetchTxs';

const V1_ADDRESS = '0xEcE8Ac1Ca1DABcCbFf1C769D03ec67aF01b216D3';
const V2_ADDRESS = '0x43A17B4e3053974486EBB10661e5423aD9C8651E';
const DECIMALS = 18;
const V2_PHASE1_END = 1756684799; // Aug 31, 2025 23:59:59 UTC

type TabKey = 'ALL' | 'V1' | 'V2';

const TransactionPage: React.FC = () => {
  const { address } = useAccount();

  const [tokens, setTokens] = useState<bigint | null>(null);
  const [events, setEvents] = useState<DepositEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const [referralData, setReferralData] = useState<{
    bonusPercentage: number;
    referralEarnings: number;
    totalReferredTokens: number;
  } | null>(null);

  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');

  const [activeTab, setActiveTab] = useState<TabKey>('ALL');

  const { data } = useReadContract({
    address: V2_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getMyTokens',
    account: address,
  });

  useEffect(() => {
    if (data) setTokens(data as bigint);
  }, [data]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const loadTxs = async () => {
      setLoading(true);
      try {
        const parsed = await fetchTxs();
        if (parsed.length > 0) {
          setEvents(parsed);
        }
      } catch (err) {
        console.error("Error fetching txs", err);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };
    loadTxs();
  }, []);

  useEffect(() => {
    if (!address || !origin) return;

    const code = `${address.slice(0, 2)}${address.slice(-3)}`;
    const link = `${origin}/${code}`;
    setReferralLink(link);

    const storeReferral = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, referralCode: code }),
        });
      } catch (err) {
        console.error('Error storing referral:', err);
      }
    };

    storeReferral();
  }, [address, origin]);

  useEffect(() => {
    if (!address) return;

    const fetchReferralData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals/summary?address=${address}`
        );
        const json = await res.json();
        setReferralData(json);
      } catch (err) {
        console.error('Error fetching referral data:', err);
      }
    };

    fetchReferralData();
  }, [address]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const readTokens = tokens ? Number(formatUnits(tokens, DECIMALS)) : 0;

  // Tab filters (for the table view only)
  const eventsV1 = events.filter((e) => e.contract === 'V1');
  const eventsV2 = events.filter((e) => e.contract === 'V2');
  const tabbedEvents =
    activeTab === 'ALL' ? events : activeTab === 'V1' ? eventsV1 : eventsV2;

  // Aggregates (corrected):
  // - V2-only spend for wallet
  // - Avg price across ALL purchases for wallet
  const userAllTxs = events.filter((e) => e.address === address?.toLowerCase());
  const userV2Txs = eventsV2.filter((e) => e.address === address?.toLowerCase());

  const userTotalUSDT_All = userAllTxs.reduce((acc, e) => acc + e.usdt, 0);
  const userTotalREAD_All = userAllTxs.reduce((acc, e) => acc + e.read, 0);
  const effectiveAvgPrice = userTotalREAD_All > 0 ? userTotalUSDT_All / userTotalREAD_All : 0;

  const userTotalUSDT_V2 = userV2Txs.reduce((acc, e) => acc + e.usdt, 0);

  return (
    <main className="min-h-screen bg-black text-white mt-16 py-16 px-4">
      {/* Stats card */}
      <div className="max-w-2xl mx-auto bg-white text-black rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Your Private Sale Stats</h1>

        <div className="flex justify-between border-b pb-2">
          <span>READ Tokens</span>
          <span>{readTokens.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>USDT Spent (V2 only)</span>
          <span>~{userTotalUSDT_V2.toFixed(2)} USDT</span>
        </div>

        {userTotalREAD_All > 0 && (
          <div className="flex justify-between border-b pb-2">
            <span>Avg Purchase Price (All)</span>
            <span>{effectiveAvgPrice.toFixed(3)} USDT / READ</span>
          </div>
        )}

        {referralData && (
          <>
            <h2 className="text-xl font-semibold pt-4">Your Referral Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-xl font-bold text-indigo-700">{referralData.bonusPercentage}%</div>
                <div className="text-xs text-gray-600 mt-1">Bonus Percentage</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-xl font-bold text-indigo-700">
                  {((referralData.referralEarnings || 0) / 0.12).toFixed(2)} READ
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  (~{referralData.referralEarnings.toFixed(2)} USDT)
                </div>
                <div className="text-xs text-gray-500 mt-1">Referral Earnings</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-xl font-bold text-indigo-700">
                  {(
                    referralData.referralEarnings && referralData.bonusPercentage
                      ? (referralData.referralEarnings / (referralData.bonusPercentage / 100)) / 0.12
                      : 0
                  ).toFixed(2)} READ
                </div>
                <div className="text-xs text-gray-600 mt-1">Referred Purchases</div>
              </div>
            </div>
          </>
        )}

        {/* Referral Link (restored) */}
        <div className="mt-6">
          <p className="text-sm font-semibold">Your Referral Link</p>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-2 rounded-md border border-gray-400 text-sm"
            />
            <button
              onClick={handleCopy}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs moved BELOW purchase history */}
      <div className="mt-6 flex gap-2 justify-center">
        {(['ALL', 'V1', 'V2'] as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-md text-sm border ${activeTab === tab
              ? 'bg-indigo-700 text-white border-indigo-700'
              : 'bg-white text-black border-gray-300'
              }`}
          >
            {tab === 'ALL' ? 'All' : tab === 'V1' ? 'Tier 1' : 'Tier 2'}
          </button>
        ))}
      </div>

      {/* Purchase history table */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4 text-center">
          READ Private Sale Stats {activeTab === 'ALL' ? '' : activeTab === 'V1' ? '(Tier 1 / V1)' : '(Tier 2 / V2)'}
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Fetching on-chain activity...</p>
        ) : tabbedEvents.length > 0 ? (
          <div className="overflow-x-auto text-sm">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="py-2 px-4">Wallet</th>
                  <th className="py-2 px-4">USDT</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Tx</th>
                </tr>
              </thead>
              <tbody>
                {tabbedEvents.map((e, i) => (
                  <tr key={i} className="border-t border-gray-300 text-white">
                    <td className="py-2 px-4 font-mono text-indigo-400 truncate">{e.address}</td>
                    <td className="py-2 px-4">{e.usdt.toFixed(2)}</td>
                    <td className="py-2 px-4 text-xs text-gray-400">{e.timestamp}</td>
                    <td className="py-2 px-4 text-blue-400 underline">
                      <a href={`https://bscscan.com/tx/${e.tx}`} target="_blank" rel="noopener noreferrer">
                        View Tx
                      </a>
                    </td>
                  </tr>
                ))}
                {tabbedEvents.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : hasFetched ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : null}


      </div>
    </main>
  );
};

export default TransactionPage;
