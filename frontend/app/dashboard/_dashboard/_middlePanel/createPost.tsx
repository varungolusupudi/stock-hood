interface CreatePostProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    sentiment: string | null;
    setSentiment: (sentiment: string | null) => void;
}

export default function CreatePost({handleSubmit, sentiment, setSentiment}: CreatePostProps) {
    return (
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
    );
}