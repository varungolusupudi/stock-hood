from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey, Text, Enum, UniqueConstraint
from datetime import datetime
from database import Base
import enum

# Enum for post sentiment
class SentimentEnum(str, enum.Enum):
    BULLISH = "bullish"
    BEARISH = "bearish"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)  # Automatically indexed
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True, nullable=True)  # For @mentions and profile URLs
    display_name = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    profile_image_url = Column(String, nullable=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class Stock(Base):
    __tablename__ = "stock"

    id = Column(Integer, primary_key=True)  # Automatically indexed
    ticker = Column(String, unique=True, index=True)
    company_name = Column(String)
    current_price = Column(Float)
    daily_change = Column(Float)
    weekly_change = Column(Float)
    market_cap = Column(Float)
    volume = Column(Float)
    last_updated = Column(DateTime, default=datetime.utcnow)
    is_trending = Column(Boolean, default=False)

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)  # Automatically indexed
    content = Column(Text)  # Text allows longer posts
    user_id = Column(Integer, ForeignKey("users.id"), index=True)  # Index for queries like "get all posts by user X"
    
    # For threading/comments
    parent_post_id = Column(Integer, ForeignKey("posts.id"), nullable=True, index=True)  # Index for "get all comments on post X"
    
    # For reposts
    repost_of_id = Column(Integer, ForeignKey("posts.id"), nullable=True, index=True)  # Index for "get all reposts of post X"
    
    # Sentiment (NULL = neutral, user didn't pick)
    sentiment = Column(Enum(SentimentEnum), nullable=True)
    
    # Cached counts for performance
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    reposts_count = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)  # Index for sorting by date
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PostLike(Base):
    __tablename__ = "post_likes"
    
    id = Column(Integer, primary_key=True)  # Automatically indexed
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)  # Index for "get all posts liked by user X"
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False, index=True)  # Index for "get all likes on post X"
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Prevent same user from liking a post twice
    __table_args__ = (UniqueConstraint('user_id', 'post_id', name='unique_user_post_like'),)
    

class PostStockMention(Base):
    __tablename__ = "post_stock_mentions"
    
    id = Column(Integer, primary_key=True)  # Automatically indexed
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False, index=True)  # Index for "get all stocks mentioned in post X"
    stock_id = Column(Integer, ForeignKey("stock.id"), nullable=False, index=True)  # Index for "get all posts about stock X"
    created_at = Column(DateTime, default=datetime.utcnow)


class PostAttachment(Base):
    __tablename__ = "post_attachments"
    
    id = Column(Integer, primary_key=True)  # Automatically indexed
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False, index=True)  # Index for "get all attachments for post X"
    file_url = Column(String, nullable=False)  # S3/Cloudinary URL
    file_type = Column(String)  # 'image/png', 'image/jpeg', 'video/mp4'
    file_size = Column(Integer)  # in bytes
    width = Column(Integer, nullable=True)  # image dimensions
    height = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
