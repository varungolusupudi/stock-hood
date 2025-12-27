import SearchBar from "./SearchBar";
import Image from 'next/image';

export default function NavBar() {
    return (
        <nav className="bg-[#DEDAE7] w-full px-8 py-4 shadow-md">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <Image 
                        src="/stock-hood-logo.png" 
                        width={200} 
                        height={200} 
                        alt="Stock hood logo"
                    />
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-8">
                    <SearchBar />
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center gap-8">
                    <li className="text-gray-700 font-medium hover:text-purple-700 cursor-pointer transition-colors duration-200">
                        Trending
                    </li>
                    <li className="text-gray-700 font-medium hover:text-purple-700 cursor-pointer transition-colors duration-200">
                        Earnings
                    </li>
                </ul>
            </div>
        </nav>
    );
}