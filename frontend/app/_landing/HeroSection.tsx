import GridBackground from "@/components/ui/GridBackground";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative pt-20 pb-8">
            <GridBackground />
            <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
                <p className="text-sm font-medium text-stone-500 tracking-wide uppercase mb-2">
                    Real-time insights
                </p>
                <h1 className="text-5xl font-bold text-stone-800 tracking-tight leading-tight">
                    Twitter for Stocks
                </h1>
                <p className="mt-3 text-lg text-stone-500 max-w-md">
                    Share predictions, track earnings, and discuss markets with investors like you.
                </p>
                
                <div className="flex flex-row gap-3 mt-6">
                    <button className="px-6 py-2.5 bg-stone-800 rounded-lg text-white text-sm font-medium hover:bg-stone-700 transition-colors duration-200">
                        <Link href="/register">Get Started</Link>
                    </button>
                    <button className="px-6 py-2.5 border border-stone-300 rounded-lg text-stone-600 text-sm font-medium hover:border-stone-400 hover:text-stone-800 transition-colors duration-200">
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
    );
}
