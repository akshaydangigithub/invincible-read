import type { Abi } from 'viem';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PRESALE_ADDRESS as `0x${string}`;

export const CONTRACT_ABI: Abi = [
  {
    "inputs": [
      { "internalType": "address", "name": "_usdt", "type": "address" },
      { "internalType": "address", "name": "_clientWallet", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "usdtAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "tokensPromised", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "totalRaised", "type": "uint256" }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getMyTokens",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  // add only what you actually use in frontend
];
