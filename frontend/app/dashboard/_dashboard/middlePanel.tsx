"use client";
import { useState, useEffect } from "react";

interface Post {
    id: number,
    content: string,
    sentiment: string,
    likes_count: number,
    reposts_count: number,
    comments_count: number,
    created_at: string,
    user_has_liked: boolean,
    author: {
        id: number,
        username: string,
        display_name: string,
        profile_image_url: string
    }
}

export default function MiddlePanel() {
    const [sentiment, setSentiment] = useState<string | null>(null);
    const [feedPosts, setFeedPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/posts", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setFeedPosts(data.posts || []);
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        });
    }, []);

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

    async function handleLike(postId: number) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/posts/${postId}/like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            console.log("Response:", data);
            setFeedPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, user_has_liked: data.liked, likes_count: data.likes_count }
                        : post
                )
            );
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
                {feedPosts.length > 0 ? (
                    feedPosts.map((post) => (
                        <div key={post.id} className="p-6 hover:bg-stone-50/30 transition-colors cursor-pointer">
                            {/* Post Header - Author Info */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-stone-200 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-semibold text-stone-900 text-sm">
                                            {post.author.display_name || post.author.username || "Anonymous"}
                                        </span>
                                        {post.author.username && (
                                            <span className="text-stone-400 text-sm">@{post.author.username}</span>
                                        )}
                                        <span className="text-stone-300">·</span>
                                        <span className="text-stone-400 text-sm">
                                            {new Date(post.created_at).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="mb-4 ml-13">
                                <p className="text-stone-800 text-[15px] leading-normal">
                                    {post.content}
                                </p>
                            </div>

                            {/* Interaction Buttons */}
                            <div className="flex items-center gap-8 ml-13 text-stone-400 text-sm">
                                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="font-medium">{post.comments_count}</span>
                                </button>
                                
                                <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 transition-colors ${
                                    post.user_has_liked ? 'text-red-500' : 'hover:text-red-500'
                                } cursor-pointer`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="font-medium">{post.likes_count}</span>
                                </button>
                                
                                <button className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="font-medium">{post.reposts_count}</span>
                                </button>
                                
                                <button className="flex items-center gap-1.5 hover:text-stone-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-stone-400 text-sm">No posts yet. Be the first to share your market insights!</p>
                    </div>
                )}
            </div>
        </div>
    );
}