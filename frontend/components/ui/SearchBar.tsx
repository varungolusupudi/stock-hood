"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';

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

    return (
        <div className="w-full relative">
            <input 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200 text-gray-700 placeholder-gray-400" 
                placeholder="Search for a stock"
                onChange={handleChange}
                value={query}
            />
            
            {/* Dropdown - only show if there are results */}
            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 
                               rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    <ul>
                        {results.map(result => (
                            <li 
                                key={result.id}
                                className="hover:bg-purple-50 cursor-pointer border-b border-gray-100 
                                          last:border-b-0 transition-colors duration-150"
                            >
                                <Link href={`/stock/${result.ticker}`}>
                                    <div className="flex justify-between items-center px-4 py-3">
                                        <div>
                                            <span className="font-bold text-gray-900">{result.ticker}</span>
                                            <span className="text-gray-600 ml-2">- {result.company_name}</span>
                                        </div>
                                        {result.current_price && (
                                            <span className="text-gray-700 font-medium">
                                                ${result.current_price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}