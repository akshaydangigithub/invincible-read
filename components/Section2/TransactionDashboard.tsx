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
        Witness the Momentum. Every Contribution, Secured on Blockchain.

      </p>

      <div className="w-full max-w-6xl mx-auto p-6 mt-10 sm:p-8 bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl rounded-[20px]">

        {/* TABLE (responsive with scroll) */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[600px] border w-full border-collapse rounded-lg">
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
                  <td className="py-3 px-4 text-sm text-[#818CF8] break-words max-w-[200px]">
                    {item.wallet}
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{item.USDT}</td>
                  <td className="py-3 px-4 text-sm text-white">{item.READ}</td>
                  <td className="py-3 px-4 text-sm text-white whitespace-nowrap">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
