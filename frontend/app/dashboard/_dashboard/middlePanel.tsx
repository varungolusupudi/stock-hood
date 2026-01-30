"use client";
import { useState } from "react";

export default function MiddlePanel() {
    const [sentiment, setSentiment] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const post = formData.get("post");
        
        try {
            const response = await fetch("http://127.0.0.1:8000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    content: post,
                    sentiment: sentiment,
                }),
            });
            const data = await response.json();
            console.log("Response:", data);

            form.reset();
            setSentiment(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-1/2 h-full overflow-y-auto border-r border-stone-200 bg-white">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 p-4 z-10">
                <h1 className="text-xl font-bold text-stone-900">Market Overview</h1>
            </div>

            {/* Create Post Form */}
            <div className="border-b border-stone-200 p-4">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <textarea 
                        name="post" 
                        rows={3}
                        placeholder="Share your insights (use $TICKER to mention stocks)" 
                        className="w-full resize-none rounded-lg p-3 text-stone-900 placeholder-stone-400 text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all"
                        required
                    />
                    
                    <div className="flex justify-between items-center pt-2"> 
                        {/* Sentiment Buttons */}
                        <div className="flex gap-1">
                            <button 
                                type="button" 
                                onClick={() => setSentiment(sentiment === "bullish" ? null : "bullish")} 
                                className={`${
                                    sentiment === "bullish" 
                                        ? "bg-green-600 text-white shadow-md" 
                                        : "bg-green-50 text-green-700 hover:bg-green-100"
                                } rounded-full text-xs font-semibold py-2 px-4 transition-all duration-200 cursor-pointer`}
                            >
                                Bullish
                            </button>
                            <button 
                                type="button"
                                onClick={() => setSentiment(sentiment === "bearish" ? null : "bearish")} 
                                className={`${
                                    sentiment === "bearish" 
                                        ? "bg-red-600 text-white shadow-md" 
                                        : "bg-red-50 text-red-700 hover:bg-red-100"
                                } rounded-full text-xs font-semibold py-2 px-4 transition-all duration-200 cursor-pointer`}
                            >
                                Bearish
                            </button>
                        </div>

                        {/* Post Button */}
                        <button 
                            type="submit" 
                            className="bg-stone-900 hover:bg-stone-800 text-white rounded-full text-sm font-semibold py-2 px-6 transition-colors shadow-sm cursor-pointer"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>

            {/* Feed Section */}
            <div className="divide-y divide-stone-200">
                <div className="p-6 text-center">
                    <p className="text-stone-400 text-sm">No posts yet. Be the first to share your market insights!</p>
                </div>
            </div>
        </div>
    );
}