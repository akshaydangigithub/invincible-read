import React from 'react'

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

]

const TransactionDashbard = () => {
    return (
        <div className='pt-10'>
            <h1 className='text-3xl font-bold text-center'>
                Transaction Dashboard
            </h1>
            <p className='text-center text-white/80 text-lg font-normal mt-4'>READ Presale Stats So Far</p>

            <div className="w-full max-w-6xl mx-auto p-6 mt-10 sm:p-8  bg-[#00000036] bg-color-grey-7 rounded-[20px] border border-storck/30">
                <table className='min-w-full divide-y divide-gray-200 border rounded-lg'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope='col' className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Wallet
                            </th>
                            <th scope='col' className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                USDT
                            </th>
                            <th scope='col' className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                READ
                            </th>
                            <th scope='col' className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-transparent divide-y divide-gray-200'>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className='py-3 px-4 whitespace-nowrap text-sm text-[#818CF8]'>{item.wallet}</td>
                                <td className='py-3 px-4 whitespace-nowrap text-sm text-white'>{item.USDT}</td>
                                <td className='py-3 px-4 whitespace-nowrap text-sm text-white'>{item.READ}</td>
                                <td className='py-3 px-4 whitespace-nowrap text-sm text-white'>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table></div>


        </div>
    )
}

export default TransactionDashbard