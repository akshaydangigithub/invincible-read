'use client';

import React, { useEffect, useState } from 'react';
import { formatUnits } from 'viem';

// === Contracts (V1 + V2) ===
const V1_ADDRESS = '0xEcE8Ac1Ca1DABcCbFf1C769D03ec67aF01b216D3';
const V2_ADDRESS = '0x43A17B4e3053974486EBB10661e5423aD9C8651E';

// === Decimals & Pricing ===
const DECIMALS = 18;
// Default price fallbacks per contract if tx calldata doesn’t include price.
// Adjust V2 default when you move tiers (or pass price in calldata).
const DEFAULT_PRICE_V1 = 0.12;
const DEFAULT_PRICE_V2 = 0.16;

// For converting referral USDT → READ (display only; an estimate)
const CURRENT_DISPLAY_PRICE = DEFAULT_PRICE_V2;

type Txn = {
  address: string;
  usdt: number;
  read: number;
  pricePerToken: number;
  timestamp: string;
  tx: string;
};

type Setting = {
  _id: string;
  address: string;
  name?: string;
  email?: string;
  bonusPercentage: number;
  updatedAt: string;
};

type ReferralSummary = {
  bonusUSDT: number;
  bonusREAD: number;       // estimated at CURRENT_DISPLAY_PRICE
  referredUSDT: number;
};

const ReferralAdmin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [referralData, setReferralData] = useState<Record<string, ReferralSummary>>({});
  const [transactions, setTransactions] = useState<Txn[]>([]);
  const [summary, setSummary] = useState({ usdt: 0, read: 0 });
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState('');
  const [bonusPercentage, setBonusPercentage] = useState<number | string>(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [status, setStatus] = useState('');

  // 🔐 Password prompt
  useEffect(() => {
    const input = prompt('Enter admin password');
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Access denied');
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals/settings`);
      const data = await res.json();
      setSettings(data);
    } catch {
      console.error('Failed to load referral settings');
    }
  };

  // --- Helper: try to parse price from second uint256 param in calldata ---
  const tryParsePriceFromInput = (input: string): number | null => {
    if (!input || input.length < 138) return null;
    // [0..9] methodID, [10..73] arg0 (usdt), [74..137] arg1 (maybe price)
    try {
      const priceHex = input.slice(74, 138);
      const priceBN = BigInt(`0x${priceHex}`);
      const price = Number(formatUnits(priceBN, DECIMALS));
      // sanity bounds to avoid nonsense
      if (price > 0 && price < 10) return price;
    } catch { }
    return null;
  };

  const fetchOnchainTransactions = async () => {
    try {
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_BSCSCAN_API_KEY;
      const addrs = [V2_ADDRESS.toLowerCase(), V1_ADDRESS.toLowerCase()];

      const urls = addrs.map((addr) =>
        `https://api.bscscan.com/api?module=account&action=txlist&address=${addr}&startblock=1&endblock=99999999&sort=desc&apikey=${apiKey}`
      );

      const results = await Promise.all(urls.map((u) => fetch(u).then((r) => r.json())));
      type BscScanTx = {
        from: string;
        to: string;
        input: string;
        isError: string;
        timeStamp: string;
        hash: string;
      };

      const all = results.flatMap((json) => {
        if (json.status !== '1' || !json.result) return [] as BscScanTx[];
        return json.result as BscScanTx[];
      });

      // Keep successes to either V1 or V2
      const successTxs = all.filter(
        (tx) =>
          tx.isError === '0' &&
          tx.to &&
          addrs.includes(tx.to.toLowerCase())
      );

      // Parse per-transaction USDT, price, READ
      const parsed: Txn[] = successTxs.map((tx) => {
        let usdt = 0;
        let pricePerToken =
          tx.to.toLowerCase() === V1_ADDRESS.toLowerCase() ? DEFAULT_PRICE_V1 : DEFAULT_PRICE_V2;

        try {
          // First arg (uint256): usdt amount (18 decimals)
          const usdtHex = tx.input?.slice(10, 74) || '';
          if (usdtHex) {
            usdt = Number(formatUnits(BigInt(`0x${usdtHex}`), DECIMALS));
          }
        } catch (e) {
          console.warn(`❗ Failed to parse USDT for tx ${tx.hash}`, e);
        }

        // Try to read price from calldata second param (if contract includes it)
        const parsedPrice = tryParsePriceFromInput(tx.input || '');
        if (parsedPrice) pricePerToken = parsedPrice;

        const read = pricePerToken > 0 ? usdt / pricePerToken : 0;

        return {
          address: tx.from?.toLowerCase() || '',
          usdt,
          read,
          pricePerToken,
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
          tx: tx.hash,
        };
      });

      // Sort newest first; reverse if you prefer oldest first
      parsed.sort((a, b) => (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

      setTransactions(parsed);

      const totalUSDT = parsed.reduce((sum, t) => sum + t.usdt, 0);
      const totalREAD = parsed.reduce((sum, t) => sum + t.read, 0);
      setSummary({ usdt: totalUSDT, read: totalREAD });
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnchainTransactions();
  }, []);

  // Fetch referral summaries (from backend)
  useEffect(() => {
    if (!settings.length) return;

    const fetchAllSummaries = async () => {
      const summaries: Record<string, ReferralSummary> = {};

      for (const s of settings) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals/summary?address=${s.address}`
          );
          const json = await res.json();

          const bonusUSDT: number = json.referralEarnings || 0;
          const referredUSDT = s.bonusPercentage > 0 ? (bonusUSDT / (s.bonusPercentage / 100)) : 0;

          // NOTE: bonusREAD here is an estimate at CURRENT_DISPLAY_PRICE.
          // If you want exact READ, you’d need per-referral-tx prices.
          const bonusREAD = CURRENT_DISPLAY_PRICE > 0 ? (bonusUSDT / CURRENT_DISPLAY_PRICE) : 0;

          summaries[s.address.toLowerCase()] = {
            referredUSDT,
            bonusUSDT,
            bonusREAD,
          };
        } catch (err) {
          console.error(`Summary error for ${s.address}:`, err);
        }
      }

      setReferralData(summaries);
    };

    fetchAllSummaries();
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let resolvedAddress = address.trim();

    if (referralLink) {
      try {
        const url = new URL(referralLink);
        const code = url.pathname.replace('/', '');
        if (!code) return setStatus('❌ Invalid referral link');

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals/code/${code}`
        );
        const json = await res.json();
        if (!json.address) return setStatus('❌ Code not found');
        resolvedAddress = json.address;
      } catch {
        return setStatus('❌ Failed to resolve referral code');
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referrals/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: resolvedAddress, bonusPercentage, name, email }),
    });

    if (res.ok) {
      setStatus('✅ Saved!');
      setAddress('');
      setReferralLink('');
      setBonusPercentage(5);
      setName('');
      setEmail('');
      fetchSettings();
    } else {
      const error = await res.json();
      setStatus(`❌ ${error.error}`);
    }
  };

  if (!authenticated) return null;

  return (
    <main className="min-h-screen bg-black text-white mt-16 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Referral Admin Dashboard</h1>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-indigo-100 text-indigo-800 p-4 rounded-xl">
            <div className="text-2xl font-bold">${summary.usdt.toFixed(2)}</div>
            <div className="text-sm text-gray-700">Total USDT Raised (V1 + V2)</div>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <div className="text-2xl font-bold">{summary.read.toFixed(2)} READ</div>
            <div className="text-sm text-gray-700">Total Tokens Sold (V1 + V2)</div>
          </div>
        </div>

        {/* Referral Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white text-black p-6 rounded-xl">
          <h2 className="text-lg font-semibold">Add / Update Referral</h2>

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Wallet Address (if not using referral link)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Referral Link"
            value={referralLink}
            onChange={(e) => setReferralLink(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Bonus %"
            type="number"
            value={bonusPercentage}
            onChange={(e) => setBonusPercentage(Number(e.target.value))}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          {status && <p className="text-green-600 mt-2 text-sm">{status}</p>}
        </form>

        {/* Settings Table */}
        <div className="bg-white rounded-xl p-6 text-sm text-black">
          <h2 className="text-lg font-semibold mb-4">Referral Settings</h2>
          {settings.length > 0 ? (
            settings.map((s) => {
              const ref = referralData[s.address.toLowerCase()] || {
                bonusUSDT: 0,
                bonusREAD: 0,
                referredUSDT: 0,
              };
              const shortCode = `${s.address.slice(0, 2)}${s.address.slice(-3)}`;
              return (
                <div key={s._id} className="mb-4 border-b pb-4">
                  <p className="font-semibold">{s.name || 'Unnamed'} – {s.bonusPercentage}%</p>
                  {s.email && <p className="text-xs text-gray-600">📧 {s.email}</p>}
                  <p className="text-xs">
                    🔗 Referral:{' '}
                    <a href={`https://invincibleread.com/${shortCode}`} target="_blank" className="text-blue-600 underline">
                      /{shortCode}
                    </a>
                  </p>
                  <p className="text-xs">
                    💰 Bonus: ~{ref.bonusREAD.toFixed(2)} READ (@ ${CURRENT_DISPLAY_PRICE.toFixed(2)}) — ${ref.bonusUSDT.toFixed(2)}
                  </p>
                  <p className="text-xs">📈 Volume: ${ref.referredUSDT.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">🕒 Last Updated: {new Date(s.updatedAt).toLocaleString()}</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">No settings found.</p>
          )}
        </div>

        {/* Transactions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">All On-Chain Transactions (V1 + V2)</h2>
          {loading ? (
            <p className="text-gray-400">Loading from BscScan...</p>
          ) : (
            <div className="overflow-x-auto text-sm border border-gray-600 rounded">
              <table className="w-full text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Wallet</th>
                    <th className="py-2 px-4">USDT</th>
                    <th className="py-2 px-4">READ</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Tx</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((e, i) => (
                    <tr key={i} className="border-t border-gray-700 text-white">
                      <td className="py-2 px-4 font-mono text-indigo-300">{e.address}</td>
                      <td className="py-2 px-4">{e.usdt.toFixed(2)}</td>
                      <td className="py-2 px-4">{e.read.toFixed(2)}</td>
                      <td className="py-2 px-4">{e.pricePerToken.toFixed(2)}</td>
                      <td className="py-2 px-4 text-xs text-gray-400">{e.timestamp}</td>
                      <td className="py-2 px-4 text-blue-400 underline">
                        <a href={`https://bscscan.com/tx/${e.tx}`} target="_blank" rel="noopener noreferrer">
                          View Tx
                        </a>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-500">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReferralAdmin;
