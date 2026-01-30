"use client";
import WatchList from "./watchList";
import { useRouter } from "next/navigation";
import { useState,  useEffect, useRef } from "react";
import { ChevronDown, Pencil} from 'lucide-react';

export default function LeftPanel() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    return (
        <div className="w-1/4 h-full bg-white overflow-y-auto border-r border-stone-200">
            <div className="flex flex-col h-full">
                {/* Profile & Post */}
                <nav className="p-4">
                    <div ref={dropdownRef} className="flex flex-col gap-1 relative">
                        {/* Profile */}
                        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-stone-100 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-400 to-stone-600" />
                            <span className="text-stone-700 group-hover:text-stone-900">Profile</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg border border-stone-200 rounded-lg py-1 z-10">
                                <button className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors">
                                    View Profile
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors">
                                    Settings
                                </button>
                                <div className="border-t border-stone-200 my-1" />
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Post Button */}
                    <button className="w-full mt-4 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-bold transition-colors shadow-sm cursor-pointer">
                        <div className="flex justify-center items-center gap-2">
                            <Pencil className="w-4 h-4" />
                            <span>Post</span>
                        </div>
                    </button>
                </nav>

                {/* Watchlist Section - takes remaining space */}
                <div className="flex-1 mt-4 border-t border-stone-200 overflow-y-auto">
                    <WatchList />
                </div>
            </div>
        </div>
    );
}