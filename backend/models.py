from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

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