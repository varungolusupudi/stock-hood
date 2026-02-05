from schemas import CreatePostSchema
from models import PostStockMention, PostAttachment, Stock, Post, User
from sqlalchemy.orm import Session

def get_posts(db: Session, limit: int = 25):
    results = (
        db.query(Post, User)
        .join(User, Post.user_id == User.id)
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
            "author": {
                "id": user.id,
                "username": user.username,
                "display_name": user.display_name,
                "profile_image_url": user.profile_image_url
            }
        }
        for post, user in results
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