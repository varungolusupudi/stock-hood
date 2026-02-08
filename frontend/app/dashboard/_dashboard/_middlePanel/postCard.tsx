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

interface PostCardProps {
    post: Post;
    variant?: "feed" | "main" | "comment";
    onComment?: (postId: number) => void;
    onLike: (postId: number) => void;
}

export default function PostCard({post, variant = "feed", onComment, onLike}: PostCardProps) {
    const isMainPost = variant === "main";
    const isComment = variant === "comment";
    const showCommentButton = variant === "feed";
    const showExtraButtons = variant === "feed" || variant === "main";

    return (
        <div className="divide-y divide-stone-200">
                <div className={`${isMainPost ? 'p-8 bg-stone-50/50 border-b-2 border-stone-300' : 'p-6'} hover:bg-stone-50/30 transition-colors cursor-pointer`}>
                   {/* Post Header - Author Info */}
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2">
                                    <span className={`font-semibold text-stone-900 ${isMainPost ? 'text-base' : 'text-sm'}`}>
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
                            <p className={`text-stone-800 leading-normal ${isMainPost ? 'text-base' : 'text-[15px]'}`}>
                                {post.content}
                            </p>
                        </div>

                        {/* Interaction Buttons */}
                        <div className="flex items-center gap-8 ml-13 text-stone-400 text-sm">
                            {/* Comment Button - only show in feed */}
                            {showCommentButton && onComment && (
                                <button onClick={() => onComment(post.id)} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="font-medium">{post.comments_count}</span>
                                </button>
                            )}

                            {/* Like Button - always show */}
                            <button onClick={() => onLike(post.id)} className={`flex items-center gap-1.5 transition-colors ${
                                post.user_has_liked ? 'text-red-500' : 'hover:text-red-500'
                            } cursor-pointer`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="font-medium">{post.likes_count}</span>
                            </button>

                            {/* Repost & Share Buttons - show for feed and main post, not comments */}
                            {showExtraButtons && (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
        </div>
    );
}