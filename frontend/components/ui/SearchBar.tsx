"use client"
import { useEffect, useState } from "react";

interface Stock {
    id: number;
    ticker: string;
    company_name: string;
    current_price: number;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Stock[]>([]);

    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            // This only runs if user hasn't typed for 300 ms
            const response = await fetch(`http://localhost:8000/stocks/search?q=${query}`);
            const data = await response.json();
            setResults(data.results);
        }, 300);

        // Cleanup: Cancel timer if user types again
        return () => clearTimeout(timer);
    }, [query])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const searchResults = results.map(result => 
        <li key={result.id}>{result.ticker} - {result.company_name}</li>
    )

    return (
        <div className="w-full">
            <input 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200 text-gray-700 placeholder-gray-400" 
                placeholder="Search for a stock"
                onChange={handleChange}
            />
            <ul>{searchResults}</ul>
        </div>
    );
}