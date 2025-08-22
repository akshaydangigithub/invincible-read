
export interface TransactionData {
    tx: any;
    wallet: string;
    USDT: string;
    READ: string;
    date: string;
}

// Types
export interface Event {
    id: number;
    edition: string;
    date: string;
    crowd: number;
    venue: string;
    description: string;
    images: string[];
}

export interface Position {
    x: number;
    y: number;
    isAbove: boolean;
}

export interface EventCardProps {
    event: Event;
    position: { x: number; y: number };
    onClose: () => void;
}