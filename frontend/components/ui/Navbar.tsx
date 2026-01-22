import SearchBar from "./SearchBar";
import Image from 'next/image';

export default function NavBar() {
    return (
        <nav className="w-full px-4 md:px-8 py-4 md:py-5 bg-transparent">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <span className="text-lg md:text-xl font-semibold tracking-tight text-stone-800">StockHood</span>
                </div>

                {/* Search Bar - hidden on mobile */}
                <div className="hidden md:block flex-1 max-w-md mx-12">
                    <SearchBar />
                </div>

                {/* Navigation Links - hidden on mobile */}
                <ul className="hidden md:flex items-center gap-6">
                    <li className="text-sm text-stone-600 hover:text-stone-900 cursor-pointer transition-colors duration-200">
                        Trending
                    </li>
                    <li className="text-sm text-stone-600 hover:text-stone-900 cursor-pointer transition-colors duration-200">
                        Earnings
                    </li>
                </ul>

                {/* Mobile: Get Started button */}
                <button className="md:hidden px-4 py-2 bg-stone-800 rounded-lg text-white text-sm font-medium">
                    Get Started
                </button>
            </div>
        </nav>
    );
}