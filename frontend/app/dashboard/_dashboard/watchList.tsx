export default function WatchList() {
    const watchedStocks = [
        { ticker: "AAPL", name: "Apple Inc.", price: "$178.50", change: "+2.5%" },
        { ticker: "TSLA", name: "Tesla Inc.", price: "$242.80", change: "-1.2%" },
        { ticker: "MSFT", name: "Microsoft", price: "$415.30", change: "+0.8%" },
    ];

    return (
        <div className="p-4">
            <h2 className="text-sm font-bold text-stone-900 mb-3">Your Watchlist</h2>
            <div className="flex flex-col gap-2">
                {watchedStocks.map((stock) => (
                    <button 
                        key={stock.ticker}
                        className="flex items-center justify-between p-3 hover:bg-stone-50 rounded-lg transition-colors text-left"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-stone-900 text-sm">${stock.ticker}</p>
                            <p className="text-xs text-stone-500 truncate">{stock.name}</p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-sm font-medium text-stone-900">{stock.price}</p>
                            <p className={`text-xs font-medium ${
                                stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {stock.change}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
            <button className="w-full mt-3 py-2 text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">
                + Add Stock
            </button>
        </div>
    );
}