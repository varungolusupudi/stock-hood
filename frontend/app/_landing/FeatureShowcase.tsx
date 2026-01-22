"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function FeatureShowcase() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Feature 1 visible at start, fades out mid-scroll
    const feature1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
    // Feature 2 fades in after feature 1, stays visible until end
    const feature2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    
    // Annotations fade in slightly after dashboard appears
    const annotationsOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
    const annotations2Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

    return (
        <section ref={containerRef} className="hidden sm:block h-[150vh] relative">
            <div className="sticky top-20 flex items-center justify-center px-6 py-10">
                {/* Wrapper for dashboard + annotations */}
                <div className="relative">
                    
                    {/* Feature 1 annotations - hidden on mobile/tablet */}
                    <motion.div 
                        style={{ opacity: annotationsOpacity }} 
                        className="hidden xl:flex absolute -left-52 top-16 items-center gap-3"
                    >
                        <div className="text-right">
                            <p className="text-sm font-medium text-stone-700">Live Charts</p>
                            <p className="text-xs text-stone-400 max-w-32">Track intraday movement in real-time</p>
                        </div>
                        <div className="w-10 h-px bg-stone-300" />
                    </motion.div>
                    
                    <motion.div 
                        style={{ opacity: annotationsOpacity }} 
                        className="hidden xl:flex absolute -left-52 bottom-24 items-center gap-3"
                    >
                        <div className="text-right">
                            <p className="text-sm font-medium text-stone-700">Share Your Take</p>
                            <p className="text-xs text-stone-400 max-w-32">Post bullish or bearish sentiment</p>
                        </div>
                        <div className="w-10 h-px bg-stone-300" />
                    </motion.div>
                    
                    <motion.div 
                        style={{ opacity: annotationsOpacity }} 
                        className="hidden xl:flex absolute -right-48 top-4 items-center gap-3"
                    >
                        <div className="w-10 h-px bg-stone-300" />
                        <div>
                            <p className="text-sm font-medium text-stone-700">Real-Time Data</p>
                            <p className="text-xs text-stone-400 max-w-36">Price updates as the market moves</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        style={{ opacity: annotationsOpacity }} 
                        className="hidden xl:flex absolute -right-48 top-44 items-center gap-3"
                    >
                        <div className="w-10 h-px bg-stone-300" />
                        <div>
                            <p className="text-sm font-medium text-stone-700">Community Feed</p>
                            <p className="text-xs text-stone-400 max-w-36">See what traders are saying</p>
                        </div>
                    </motion.div>

                    {/* Feature 2 annotations - hidden on mobile/tablet */}
                    <motion.div 
                        style={{ opacity: annotations2Opacity }} 
                        className="hidden xl:flex absolute -left-52 top-20 items-center gap-3"
                    >
                        <div className="text-right">
                            <p className="text-sm font-medium text-stone-700">Price Targets</p>
                            <p className="text-xs text-stone-400 max-w-32">See where traders think it&apos;s going</p>
                        </div>
                        <div className="w-10 h-px bg-stone-300" />
                    </motion.div>
                    
                    <motion.div 
                        style={{ opacity: annotations2Opacity }} 
                        className="hidden xl:flex absolute -left-52 bottom-24 items-center gap-3"
                    >
                        <div className="text-right">
                            <p className="text-sm font-medium text-stone-700">Make Predictions</p>
                            <p className="text-xs text-stone-400 max-w-32">Set your own price targets</p>
                        </div>
                        <div className="w-10 h-px bg-stone-300" />
                    </motion.div>
                    
                    <motion.div 
                        style={{ opacity: annotations2Opacity }} 
                        className="hidden xl:flex absolute -right-48 top-20 items-center gap-3"
                    >
                        <div className="w-10 h-px bg-stone-300" />
                        <div>
                            <p className="text-sm font-medium text-stone-700">Consensus</p>
                            <p className="text-xs text-stone-400 max-w-36">See if the community agrees</p>
                        </div>
                    </motion.div>

                    {/* Dashboard container */}
                    <div className="w-full max-w-[900px] mx-4 md:mx-0 border border-stone-200 rounded-2xl bg-white shadow-xl overflow-hidden relative">
                        
                        {/* Feature 1 - Stock Overview */}
                        <motion.div style={{ opacity: feature1Opacity }} className="p-4 md:p-6">
                            {/* Header */}
                            <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-5 pb-3 md:pb-4 border-b border-stone-100">
                                <span className="text-lg md:text-xl font-bold text-stone-800">$TSLA</span>
                                <span className="text-stone-400 text-sm hidden sm:inline">Tesla, Inc.</span>
                                <div className="ml-auto flex items-center gap-2 md:gap-3">
                                    <span className="text-xl md:text-2xl font-semibold text-stone-800">$249.50</span>
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs md:text-sm font-medium rounded">+2.4%</span>
                                </div>
                            </div>

                            {/* Two columns - stacks on mobile */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-4 md:mb-5">
                                {/* Chart */}
                                <div className="md:col-span-3 bg-stone-50 rounded-xl p-3 md:p-4">
                                    <div className="flex gap-3">
                                        <div className="flex flex-col justify-between text-[10px] text-stone-400 py-1 w-8 text-right">
                                            <span>$260</span>
                                            <span>$250</span>
                                            <span>$240</span>
                                            <span>$230</span>
                                        </div>
                                        <div className="flex-1">
                                            <svg viewBox="0 0 300 100" className="w-full h-36" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="#78716c" stopOpacity="0.12" />
                                                        <stop offset="100%" stopColor="#78716c" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <line x1="0" y1="0" x2="300" y2="0" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <line x1="0" y1="33" x2="300" y2="33" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <line x1="0" y1="66" x2="300" y2="66" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <line x1="0" y1="100" x2="300" y2="100" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <line x1="75" y1="0" x2="75" y2="100" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <line x1="150" y1="0" x2="150" y2="100" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <line x1="225" y1="0" x2="225" y2="100" stroke="#e7e5e4" strokeWidth="0.5" />
                                                <path d="M 0 75 C 15 72, 25 68, 40 70 C 55 72, 65 65, 80 60 C 95 55, 105 58, 120 52 C 135 46, 145 48, 160 42 C 175 36, 185 40, 200 35 C 215 30, 225 32, 240 28 C 255 24, 270 26, 285 22 L 300 20 L 300 100 L 0 100 Z" fill="url(#chartGradient)" />
                                                <path d="M 0 75 C 15 72, 25 68, 40 70 C 55 72, 65 65, 80 60 C 95 55, 105 58, 120 52 C 135 46, 145 48, 160 42 C 175 36, 185 40, 200 35 C 215 30, 225 32, 240 28 C 255 24, 270 26, 285 22 L 300 20" fill="none" stroke="#57534e" strokeWidth="1.5" />
                                                <line x1="0" y1="20" x2="300" y2="20" stroke="#57534e" strokeWidth="0.5" strokeDasharray="4 2" />
                                                <circle cx="300" cy="20" r="3" fill="#57534e" />
                                                <circle cx="300" cy="20" r="6" fill="#57534e" fillOpacity="0.15" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-stone-400 mt-2 ml-11">
                                        <span>9:30 AM</span>
                                        <span>11:00</span>
                                        <span>12:30</span>
                                        <span>2:00</span>
                                        <span>4:00 PM</span>
                                    </div>
                                </div>
                                
                                {/* Posts - hidden on mobile to save space */}
                                <div className="hidden md:block md:col-span-2 space-y-3">
                                    <div className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Latest Posts</div>
                                    <div className="bg-stone-50 rounded-xl p-3">
                                        <p className="text-sm text-stone-600 leading-relaxed">
                                            <span className="font-semibold text-stone-800">@investor</span> TSLA looking strong after earnings beat. Expecting continuation.
                                        </p>
                                        <div className="flex gap-4 mt-2 text-xs text-stone-400">
                                            <span className="text-emerald-600">142 bullish</span>
                                            <span>28 replies</span>
                                        </div>
                                    </div>
                                    <div className="bg-stone-50 rounded-xl p-3">
                                        <p className="text-sm text-stone-600 leading-relaxed">
                                            <span className="font-semibold text-stone-800">@trader</span> Watching $250 resistance. Break above = new highs.
                                        </p>
                                        <div className="flex gap-4 mt-2 text-xs text-stone-400">
                                            <span className="text-emerald-600">89 bullish</span>
                                            <span>15 replies</span>
                                        </div>
                                    </div>
                                    <div className="bg-stone-50 rounded-xl p-3">
                                        <p className="text-sm text-stone-600 leading-relaxed">
                                            <span className="font-semibold text-stone-800">@analyst</span> PT raised to $280. Strong delivery numbers.
                                        </p>
                                        <div className="flex gap-4 mt-2 text-xs text-stone-400">
                                            <span className="text-emerald-600">234 bullish</span>
                                            <span>47 replies</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Compose */}
                            <div className="border-t border-stone-100 pt-3 md:pt-4">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                    <input className="flex-1 bg-stone-50 rounded-xl px-4 py-2.5 md:py-3 text-sm text-stone-700 placeholder-stone-400" placeholder="What's your take on $TSLA?" disabled />
                                    <div className="flex gap-2">
                                        <button className="flex-1 sm:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl ring-2 ring-emerald-200 ring-offset-2">Bullish</button>
                                        <button className="flex-1 sm:flex-none px-4 md:px-5 py-2 md:py-2.5 border border-stone-200 text-stone-500 text-sm font-medium rounded-xl">Bearish</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feature 2 - Predictions */}
                        <motion.div style={{ opacity: feature2Opacity }} className="absolute inset-0 p-6 bg-white">
                            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-stone-100">
                                <span className="text-xl font-bold text-stone-800">$TSLA</span>
                                <span className="text-stone-400">Tesla, Inc.</span>
                                <div className="ml-auto flex items-center gap-3">
                                    <span className="text-2xl font-semibold text-stone-800">$249.50</span>
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded">+2.4%</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Top Prediction</span>
                                    </div>
                                    <div className="mb-5">
                                        <h3 className="text-2xl font-semibold text-stone-800 tracking-tight">$TSLA → $300</h3>
                                        <p className="text-stone-400 text-sm mt-1">by March 15, 2026</p>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-stone-500 mb-2">
                                            <span>Community consensus</span>
                                            <span className="font-medium text-stone-700">68%</span>
                                        </div>
                                        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-stone-700 rounded-full" style={{ width: '68%' }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-xs text-stone-400">
                                        <span>234 traders</span>
                                        <span>47 comments</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">More Predictions</div>
                                    <div className="bg-stone-50 rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-stone-800">$TSLA → $280</p>
                                                <p className="text-xs text-stone-400">by Feb 2026</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 h-1 bg-stone-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-stone-600 rounded-full" style={{ width: '72%' }} />
                                                </div>
                                                <span className="text-xs font-medium text-stone-600 w-8">72%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-stone-50 rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-stone-800">$TSLA → $200</p>
                                                <p className="text-xs text-stone-400">by April 2026</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 h-1 bg-stone-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-stone-400 rounded-full" style={{ width: '23%' }} />
                                                </div>
                                                <span className="text-xs font-medium text-stone-400 w-8">23%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-stone-50 rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-stone-800">$TSLA → $350</p>
                                                <p className="text-xs text-stone-400">by Dec 2026</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 h-1 bg-stone-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-stone-500 rounded-full" style={{ width: '54%' }} />
                                                </div>
                                                <span className="text-xs font-medium text-stone-500 w-8">54%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-stone-100 pt-4 mt-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-xl px-4 py-3">
                                        <span className="text-sm text-stone-800 font-medium">$TSLA will hit</span>
                                        <input className="w-20 bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-sm text-stone-700 text-center" placeholder="$___" disabled />
                                        <span className="text-sm text-stone-800 font-medium">by</span>
                                        <input className="w-32 bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-sm text-stone-400 text-center" placeholder="Select date" disabled />
                                    </div>
                                    <button className="px-5 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-xl ring-2 ring-stone-300 ring-offset-2">Post Prediction</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
