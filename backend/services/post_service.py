from schemas import CreatePostSchema
from models import PostStockMention, PostAttachment, Stock, Post, User, PostLike
from sqlalchemy.orm import Session

def get_posts(db: Session, user: User, limit: int = 25):
    likes = db.query(PostLike).filter(PostLike.user_id == user.id).all()
    liked_posts = [like.post_id for like in likes]
    results = (
        db.query(Post, User)
        .join(User, Post.user_id == User.id)
        .filter(Post.parent_post_id.is_(None))
        .order_by(Post.created_at.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": post.id,
            "content": post.content,
            "sentiment": post.sentiment,
            "likes_count": post.likes_count,
            "comments_count": post.comments_count,
            "reposts_count": post.reposts_count,
            "created_at": post.created_at,
            "user_has_liked": post.id in liked_posts,
            "author": {
                "id": author.id,
                "username": author.username,
                "display_name": author.display_name,
                "profile_image_url": author.profile_image_url
            }
        }
        for post, author in results
    ]

def create_post(data: CreatePostSchema, user: User, db: Session):
    if data.parent_post_id:
        parent_post = db.query(Post).filter(Post.id == data.parent_post_id).first()
        if not parent_post:
            raise ValueError("Parent post not found")
        parent_post.comments_count += 1
    
    if data.repost_of_id:
        original_post = db.query(Post).filter(Post.id == data.repost_of_id).first()
        if not original_post:
            raise ValueError("Original post not found")
        original_post.reposts_count += 1
    
    post = Post(
        content=data.content or "",
        user_id=user.id,
        sentiment=data.sentiment,
        parent_post_id=data.parent_post_id,
        repost_of_id=data.repost_of_id
    )
    db.add(post)
    db.flush()

    if data.tickers:
        stocks = db.query(Stock).filter(Stock.ticker.in_(data.tickers)).all()
        
        found_tickers = set(stock.ticker for stock in stocks)
        missing_tickers = set(data.tickers) - found_tickers
        if missing_tickers:
            raise ValueError(f"Stock tickers not found: {', '.join(missing_tickers)}")

        for stock in stocks:
            mention = PostStockMention(
                post_id=post.id,
                stock_id=stock.id
            )
            db.add(mention)
    
    for attachment_url in data.attachments:
        attachment = PostAttachment(
            post_id=post.id,
            file_url=attachment_url.file_url,
            file_type=attachment_url.file_type
            #TODO: Add file size, width, height
        )
        db.add(attachment)

    db.commit()
    db.refresh(post)

    return post

def like_post(post_id: int, user: User, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise ValueError("Post not found")
    
    like = db.query(PostLike).filter(PostLike.user_id == user.id).filter(PostLike.post_id == post_id).first()
    if like:
        db.delete(like)
        post.likes_count -= 1
        db.commit()
        db.refresh(post)
        return {"message": f"Unliked post {post_id}", "likes_count": post.likes_count, "liked": False}
    else:
        like = PostLike(
            user_id=user.id,
            post_id=post_id
        )
        db.add(like)
        post.likes_count += 1
        db.commit()
        db.refresh(post)
        return {"message": f"Liked post {post_id}", "likes_count": post.likes_count, "liked": True}

def get_comments_on_post(post_id: int, db: Session, user: User):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise ValueError("Post not found")
    
    # Query user's likes once
    likes = db.query(PostLike).filter(PostLike.user_id == user.id).all()
    liked_post_ids = {like.post_id for like in likes}
    
    # Join comments with their authors
    results = (
        db.query(Post, User)
        .join(User, Post.user_id == User.id)
        .filter(Post.parent_post_id == post_id)
        .order_by(Post.created_at.asc())
        .all()
    )
    
    return [
        {
            "id": comment.id,
            "content": comment.content,
            "sentiment": comment.sentiment,
            "likes_count": comment.likes_count,
            "comments_count": comment.comments_count,
            "reposts_count": comment.reposts_count,
            "created_at": comment.created_at,
            "user_has_liked": comment.id in liked_post_ids,
            "author": {
                "id": author.id,
                "username": author.username,
                "display_name": author.display_name,
                "profile_image_url": author.profile_image_url
            }
        }
        for comment, author in results
    ]
    

def comment_on_post(post_id: int, data: CreatePostSchema, user: User, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise ValueError("Post not found")
    
    comment = Post(
        user_id=user.id,
        content=data.content,
        parent_post_id=post_id
    )
    db.add(comment)
    db.flush()

    if data.tickers:
        stocks = db.query(Stock).filter(Stock.ticker.in_(data.tickers)).all()

        found_tickers = set(stock.ticker for stock in stocks)
        missing_tickers = set(data.tickers) - found_tickers
        if missing_tickers:
            raise ValueError(f"Stock tickers not found: {', '.join(missing_tickers)}")
        
        for stock in stocks:
            mention = PostStockMention(
                post_id=comment.id,
                stock_id=stock.id,
            )
            db.add(mention)
    
    for attachment_url in data.attachments:
        attachment = PostAttachment(
            post_id=comment.id,
            file_url=attachment_url.file_url,
            file_type=attachment_url.file_type
            #TODO: Add file size, width, height
        )
        db.add(attachment)
    
    post.comments_count += 1
    db.commit()
    db.refresh(comment)

    return comment

def get_user_activity(user: User, db: Session):
    all_user_posts = db.query(Post).filter(Post.user_id == user.id).all()
    posts = [post for post in all_user_posts if post.parent_post_id is None]
    comments = [post for post in all_user_posts if post.parent_post_id is not None]
    return {
        "posts": posts,
        "comments": comments
    }