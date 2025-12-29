"use client"
import NavBar from "@/components/ui/Navbar";
import { useEffect, useState, use } from "react";

interface StockData {
    id: number;
    ticker: string;
    company_name: string;
    current_price: number;
    market_cap: number;
    daily_change: number | null;
    volume: number | null;
}

export default function Stock({ params }: { params: Promise<{ ticker: string }> }) {
    const { ticker } = use(params);
    const [stockData, setStockData] = useState<StockData | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/stocks/${ticker}`)
        .then(res => res.json())
        .then(data => {
            console.log("Received data:", data);
            setStockData(data.stock);  // Extract the 'stock' property!
        });
    }, [ticker]);

    return (
        <div className="flex flex-col items-center justify-center">
            <NavBar/>
            <div className="flex flex-row gap-2">
                <div>Showing data for {ticker}</div>
                {stockData ? (
                    <div>
                        <p>Company: {stockData.company_name}</p>
                        <p>Price: ${stockData.current_price}</p>
                        <p>Market Cap: ${stockData.market_cap?.toLocaleString()}</p>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}
