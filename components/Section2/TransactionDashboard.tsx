import React from "react";

const data = [
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
  {
    wallet: "0xd38f588a500b6257925244110a1f3a435efb076b",
    USDT: "60.00",
    READ: "500.00",
    date: "7/31/2025, 8:04:09 PM",
  },
];

const TransactionDashboard = () => {
  return (
    <div className="pt-10">
      <h1 className="text-3xl font-bold text-center">Transaction Dashboard</h1>
      <p className="text-center text-white/80 text-lg font-normal mt-4">
        READ Presale Stats So Far
      </p>

      <div className="w-full max-w-6xl mx-auto p-6 mt-10 sm:p-8 bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl rounded-[20px]">

        {/* TABLE (desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs text-black font-bold uppercase">
                  Wallet
                </th>
                <th className="py-3 px-4 text-left text-xs text-black font-bold uppercase">
                  USDT
                </th>
                <th className="py-3 px-4 text-left text-xs text-black font-bold uppercase">
                  READ
                </th>
                <th className="py-3 px-4 text-left text-xs text-black font-bold uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-sm text-[#818CF8] break-all">
                    {item.wallet}
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{item.USDT}</td>
                  <td className="py-3 px-4 text-sm text-white">{item.READ}</td>
                  <td className="py-3 px-4 text-sm text-white">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS (only visible on small screens) */}
        <div className="md:hidden space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-white/10 bg-black/40 shadow-sm"
            >
              <p className="text-xs uppercase text-gray-400">Wallet</p>
              <p className="text-sm font-mono text-[#818CF8] break-all">
                {item.wallet}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <p className="text-xs uppercase text-gray-400">USDT</p>
                  <p className="text-sm text-white">{item.USDT}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-400">READ</p>
                  <p className="text-sm text-white">{item.READ}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs uppercase text-gray-400">Date</p>
                  <p className="text-sm text-white">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="mt-5 block mx-auto px-10 sm:px-32 cursor-pointer uppercase py-2 bg-[#2B2B2B] text-white rounded-full">
          Transaction Dashboard
        </button>
      </div>
    </div>
  );
};

export default TransactionDashboard;
