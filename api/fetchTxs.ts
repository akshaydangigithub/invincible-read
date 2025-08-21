import { formatUnits } from "viem";

const V1_ADDRESS = "0xEcE8Ac1Ca1DABcCbFf1C769D03ec67aF01b216D3";
const V2_ADDRESS = "0x43A17B4e3053974486EBB10661e5423aD9C8651E";
const DECIMALS = 18;
const V2_PHASE1_END = 1756684799; // Aug 31, 2025 23:59:59 UTC

export type DepositEvent = {
    address: string;
    usdt: number;
    read: number;
    pricePerToken: number;
    timestamp: string;
    ts: number; // numeric for sorting
    tx: string;
    contract: "V1" | "V2";
};

export const fetchTxs = async (): Promise<DepositEvent[]> => {
    const addresses = [V2_ADDRESS.toLowerCase(), V1_ADDRESS.toLowerCase()];
    const bscscanApiKey = process.env.NEXT_PUBLIC_BSCSCAN_API_KEY;

    try {
        const allTxs = await Promise.all(
            addresses.map(async (addr) => {
                const res = await fetch(
                    `https://api.bscscan.com/api?module=account&action=txlist&address=${addr}&startblock=1&endblock=99999999&sort=desc&apikey=${bscscanApiKey}`
                );
                const json = await res.json();

                if (json.status !== "1" || !json.result) return [];

                return json.result as {
                    from: string;
                    to: string;
                    input: string;
                    isError: string;
                    timeStamp: string;
                    hash: string;
                }[];
            })
        );

        const successTxs = allTxs
            .flat()
            .filter((tx) => tx.isError === "0" && addresses.includes(tx.to?.toLowerCase()));

        const parsed: DepositEvent[] = successTxs.map((tx) => {
            const lowerTo = tx.to?.toLowerCase() || "";
            const contract: "V1" | "V2" =
                lowerTo === V1_ADDRESS.toLowerCase() ? "V1" : "V2";

            // decode usdtAmount from calldata (deposit(uint256))
            let usdt = 0;
            try {
                const usdtHex = tx.input.slice(10, 74);
                const usdtBN = BigInt(`0x${usdtHex || "0"}`);
                usdt = Number(formatUnits(usdtBN, DECIMALS));
            } catch { }

            const ts = parseInt(tx.timeStamp, 10);

            let pricePerToken = 0;
            if (contract === "V1") {
                pricePerToken = 0.12;
            } else {
                pricePerToken = ts <= V2_PHASE1_END ? 0.16 : 0.21;
            }

            const read = pricePerToken > 0 ? usdt / pricePerToken : 0;

            return {
                address: tx.from.toLowerCase(),
                usdt,
                read,
                pricePerToken,
                timestamp: new Date(ts * 1000).toLocaleString(),
                ts,
                tx: tx.hash,
                contract,
            };
        });

        parsed.sort((a, b) => {
            if (a.contract !== b.contract) return a.contract === "V2" ? -1 : 1;
            return b.ts - a.ts;
        });

        return parsed;
    } catch (err) {
        console.error("Error fetching BscScan txs:", err);
        return [];
    }
};
