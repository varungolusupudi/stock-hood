"use client";
import { useState, useEffect, useRef } from "react";

interface Stock {
    id: number;
    ticker: string;
    company_name: string;
    current_price: number;
}

export default function WatchList() {
    const [watchedStocks, setWatchedStocks] = useState<Stock[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Stock[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setIsOpen(false);
                setSearchQuery("");
                setSearchResults([]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch watchlist on mount
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/watchlist`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setWatchedStocks(data.watchlist || []);
        })
        .catch(error => {
            console.error("Error fetching watchlist:", error);
        });
    }, []);

    // Search stocks with debounce
    useEffect(() => {
        if (searchQuery.length === 0) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}stocks/search?q=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data.results || []);
            } catch (error) {
                console.error("Search error:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleAddStock = (ticker: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ ticker: ticker })
        })
        .then(res => res.json())
        .then(() => {
            // Re-fetch watchlist
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/watchlist`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
        })
        .then(res => res.json())
        .then(data => {
            setWatchedStocks(data.watchlist || []);
            setIsOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        })
        .catch(error => {
            console.error("Error adding stock:", error);
        });
    }

    const handleRemoveStock = (ticker: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/watchlist/${ticker}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(() => {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/watchlist`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
        })
        .then(res => res.json())
        .then(data => {
            setWatchedStocks(data.watchlist || []);
            setIsOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        })
        .catch(error => {
            console.error("Error removing stock:", error);
        });
    }

    return (
        <div className="p-4">
            <h2 className="text-sm font-bold text-stone-900 mb-3">Your Watchlist</h2>
            
            {/* Watchlist Items */}
            <div className="flex flex-col gap-2.5 mb-4">
                {watchedStocks.length > 0 ? (
                    watchedStocks.map((stock) => (
                        <div key={stock.ticker} className="relative group">
                            <button 
                                className="w-full flex items-center justify-between p-4 hover:bg-stone-50 rounded-lg transition-colors text-left"
                            >
                                <div className="flex-1 min-w-0 pr-2">
                                    <p className="font-semibold text-stone-900 text-sm mb-0.5">${stock.ticker}</p>
                                    <p className="text-xs text-stone-500 truncate">{stock.company_name}</p>
                                </div>
                                <div className="text-right mr-10">
                                    <p className="text-sm font-medium text-stone-900">
                                        ${stock.current_price.toFixed(2)}
                                    </p>
                                </div>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveStock(stock.ticker);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 
                                           p-2 rounded-full
                                           opacity-0 group-hover:opacity-100 
                                           transition-all duration-200
                                           text-stone-300 hover:text-red-500 hover:bg-red-50"
                                aria-label="Remove from watchlist"
                                title="Remove from watchlist"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-stone-400 text-center py-4">No stocks yet. Add some to track!</p>
                )}
            </div>

            {/* Add Stock Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="w-full py-2 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg font-medium transition-colors"
                >
                    + Add Stock
                </button>
                
                {isOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-stone-200 rounded-lg shadow-xl p-3 z-50">
                        {/* Search Input */}
                        <input 
                            type="text" 
                            placeholder="Search stocks (e.g., AAPL)" 
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value)}
                            autoFocus
                            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                        />
                        
                        {/* Search Results */}
                        <div className="mt-2 max-h-64 overflow-y-auto">
                            {isSearching && (
                                <p className="text-xs text-stone-400 text-center py-4">Searching...</p>
                            )}
                            
                            {!isSearching && searchQuery && searchResults.length === 0 && (
                                <p className="text-xs text-stone-400 text-center py-4">No stocks found</p>
                            )}
                            
                            {!isSearching && searchQuery.length === 0 && (
                                <p className="text-xs text-stone-400 text-center py-4">Type to search</p>
                            )}
                            
                            {!isSearching && searchResults.length > 0 && (
                                <ul className="divide-y divide-stone-100">
                                    {searchResults.map(result => (
                                        <li key={result.id}>
                                            <button 
                                                onClick={() => handleAddStock(result.ticker)}
                                                className="w-full text-left px-3 py-2.5 hover:bg-stone-50 transition-colors rounded"
                                            >
                                                <div className="flex justify-between items-center gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-stone-900 text-sm">${result.ticker}</p>
                                                        <p className="text-xs text-stone-500 truncate">{result.company_name}</p>
                                                    </div>
                                                    {result.current_price && (
                                                        <span className="text-stone-600 font-medium text-xs whitespace-nowrap">
                                                            ${result.current_price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}