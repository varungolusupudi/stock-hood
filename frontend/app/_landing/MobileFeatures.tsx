export default function MobileFeatures() {
    return (
        <div className="px-4 py-8 sm:hidden">
            {/* Dashboard preview */}
            <div className="w-full border border-stone-200 rounded-2xl bg-white shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-stone-800">$TSLA</span>
                        <span className="text-xs text-stone-400">Tesla, Inc.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-stone-800">$249.50</span>
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-medium rounded">+2.4%</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="p-4">
                    <div className="bg-stone-50 rounded-xl p-3">
                        <div className="flex gap-2">
                            <div className="flex flex-col justify-between text-[8px] text-stone-400 py-0.5 w-5 text-right">
                                <span>260</span>
                                <span>250</span>
                                <span>240</span>
                                <span>230</span>
                            </div>
                            <div className="flex-1">
                                <svg viewBox="0 0 300 100" className="w-full h-24" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="mobileChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#78716c" stopOpacity="0.1" />
                                            <stop offset="100%" stopColor="#78716c" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <line x1="0" y1="33" x2="300" y2="33" stroke="#e7e5e4" strokeWidth="0.5" />
                                    <line x1="0" y1="66" x2="300" y2="66" stroke="#e7e5e4" strokeWidth="0.5" />
                                    <path d="M 0 75 C 15 72, 25 68, 40 70 C 55 72, 65 65, 80 60 C 95 55, 105 58, 120 52 C 135 46, 145 48, 160 42 C 175 36, 185 40, 200 35 C 215 30, 225 32, 240 28 C 255 24, 270 26, 285 22 L 300 20 L 300 100 L 0 100 Z" fill="url(#mobileChartGradient)" />
                                    <path d="M 0 75 C 15 72, 25 68, 40 70 C 55 72, 65 65, 80 60 C 95 55, 105 58, 120 52 C 135 46, 145 48, 160 42 C 175 36, 185 40, 200 35 C 215 30, 225 32, 240 28 C 255 24, 270 26, 285 22 L 300 20" fill="none" stroke="#57534e" strokeWidth="1.5" />
                                    <circle cx="300" cy="20" r="2.5" fill="#57534e" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-between text-[8px] text-stone-400 mt-1 ml-6">
                            <span>9:30</span>
                            <span>12:00</span>
                            <span>4:00</span>
                        </div>
                    </div>
                </div>

                {/* Sample post - shows social aspect */}
                <div className="px-4 pb-3">
                    <div className="bg-stone-50 rounded-xl p-3">
                        <p className="text-xs text-stone-600 leading-relaxed">
                            <span className="font-semibold text-stone-800">@investor</span> TSLA looking strong after earnings. Expecting continuation to $260.
                        </p>
                        <div className="flex gap-3 mt-2 text-[10px] text-stone-400">
                            <span className="text-emerald-600 font-medium">142 bullish</span>
                            <span>28 replies</span>
                        </div>
                    </div>
                </div>

                {/* Compose */}
                <div className="border-t border-stone-100 p-4">
                    <div className="flex gap-2">
                        <input 
                            className="flex-1 bg-stone-50 rounded-lg px-3 py-2 text-xs text-stone-700 placeholder-stone-400" 
                            placeholder="Your take on $TSLA?" 
                            disabled 
                        />
                        <button className="px-3 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg">
                            Post
                        </button>
                    </div>
                </div>
            </div>

            {/* Section divider */}
            <div className="flex items-center gap-3 my-8">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Features</span>
                <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-stone-800 text-sm">Live Charts</h3>
                    <p className="text-xs text-stone-500 mt-1">Real-time intraday data</p>
                </div>
                
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-stone-800 text-sm">Community</h3>
                    <p className="text-xs text-stone-500 mt-1">See what traders think</p>
                </div>
                
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-stone-800 text-sm">Predictions</h3>
                    <p className="text-xs text-stone-500 mt-1">Set price targets</p>
                </div>
                
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-stone-800 text-sm">Alerts</h3>
                    <p className="text-xs text-stone-500 mt-1">Never miss a move</p>
                </div>
            </div>
        </div>
    );
}
