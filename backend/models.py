from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey, Text, Enum, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

# Enum for post sentiment
class SentimentEnum(str, enum.Enum):
    BULLISH = "bullish"
    BEARISH = "bearish"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True, nullable=True)  # For @mentions and profile URLs
    display_name = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    profile_image_url = Column(String, nullable=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    posts = relationship("Post", back_populates="author", foreign_keys="Post.user_id")
    likes = relationship("PostLike", back_populates="user")
    reposts = relationship("Post", back_populates="reposter", foreign_keys="Post.repost_of_id")

class Stock(Base):
    __tablename__ = "stock"

    id = Column(Integer, primary_key=True, index=True)
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

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    reposts_count = Column(Integer, default=0)

    post_sentiment = Column(Enum(SentimentEnum), default=SentimentEnum.NEUTRAL)

class PostLike(Base):
    __tablename__ = "post_likes"

class PostStockMention(Base):
    __tablename__ = "post_stock_mentions"
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    stock_id = Column(Integer, ForeignKey("stock.id"))
    created_at = Column(DateTime, default=datetime.utcnow)


class PostAttachment(Base):
    __tablename__ = "post_attachments"
