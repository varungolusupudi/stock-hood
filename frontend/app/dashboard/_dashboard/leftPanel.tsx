"use client";
import WatchList from "./watchList";
import { useRouter } from "next/navigation";

export default function LeftPanel() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className="w-1/4 h-full bg-white overflow-y-auto border-r border-stone-200">
            <div className="flex flex-col h-full">
                {/* Navigation Links */}
                <nav className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                        {/* Home */}
                        <button className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-stone-100 transition-colors group">
                            <span className="text-2xl">🏠</span>
                            <span className="text-stone-900 font-semibold group-hover:text-stone-900">Home</span>
                        </button>

                        {/* Explore */}
                        <button className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-stone-100 transition-colors group">
                            <span className="text-2xl">🔍</span>
                            <span className="text-stone-700 group-hover:text-stone-900">Explore</span>
                        </button>

                        {/* Watchlist */}
                        <button className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-stone-100 transition-colors group">
                            <span className="text-2xl">⭐</span>
                            <span className="text-stone-700 group-hover:text-stone-900">Watchlist</span>
                        </button>

                        {/* Profile */}
                        <button className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-stone-100 transition-colors group">
                            <span className="text-2xl">👤</span>
                            <span className="text-stone-700 group-hover:text-stone-900">Profile</span>
                        </button>

                        {/* Settings */}
                        <button className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-stone-100 transition-colors group">
                            <span className="text-2xl">⚙️</span>
                            <span className="text-stone-700 group-hover:text-stone-900">Settings</span>
                        </button>
                    </div>

                    {/* Post Button */}
                    <button className="w-full mt-4 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-bold transition-colors shadow-sm">
                        Post
                    </button>
                </nav>

                {/* Watchlist Section */}
                <div className="border-t border-stone-200">
                    <WatchList />
                </div>

                {/* User Profile / Logout */}
                <div className="border-t border-stone-200 p-4">
                    <div className="flex items-center justify-between px-3 py-2 hover:bg-stone-50 rounded-full cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-400 to-stone-600" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-stone-900 truncate">Trader</p>
                                <p className="text-xs text-stone-500 truncate">@trader123</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="text-stone-500 hover:text-red-600 transition-colors"
                            title="Logout"
                        >
                            <span className="text-xl">🚪</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}