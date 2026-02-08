"use client";
import { useState, useEffect } from "react";
import PostCard from "./_middlePanel/postCard";
import CreatePost from "./_middlePanel/createPost";

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
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Post[]>([]);

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

    async function handleComment(postId: number, comment: string) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    content: comment,
                    sentiment: sentiment,
                }),
            })
            const data = await response.json();
            console.log("Response:", data);
        } catch (error) {
            console.error(error);
        }
    }
    async function showCommentsOnPost(postId: number) {
        try {
            const post = feedPosts.find(p => p.id === postId);
            setSelectedPost(post || null);

            const response = await fetch(`http://127.0.0.1:8000/posts/${postId}/comments`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            const data = await response.json();
            setComments(data.comments || []);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-1/2 h-full overflow-y-auto border-r border-stone-200 bg-white">
            {selectedPost ? (
                <>
                    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 p-4 z-10">
                        <button onClick={() => setSelectedPost(null)} className="text-stone-500 hover:text-stone-700 transition-colors">← Back</button>
                    </div>

                    <PostCard post={selectedPost} variant="main" onLike={handleLike} />

                    {/* Comments Section */}
                    <div className="divide-y divide-stone-200">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <PostCard key={comment.id} variant="comment" post={comment} onLike={handleLike} />
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-stone-400 text-sm">No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Header */}
                    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 p-4 z-10">
                        <h1 className="text-xl font-bold text-stone-900">Market Overview</h1>
                    </div>

                    {/* Create Post Form */}
                    <div className="border-b border-stone-200 p-4">
                        <CreatePost handleSubmit={handleSubmit} sentiment={sentiment} setSentiment={setSentiment} />
                    </div>

                    {/* Feed Section */}
                    <div className="divide-y divide-stone-200">
                        {feedPosts.length > 0 ? (
                            feedPosts.map((post) => (
                                <PostCard key={post.id} post={post} onComment={showCommentsOnPost} onLike={handleLike} />
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-stone-400 text-sm">No posts yet. Be the first to share your market insights!</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}