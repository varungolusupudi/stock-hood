from datetime import datetime, timedelta
import yfinance as yf
from models import Stock
from sqlalchemy import or_


def fetch_ticker(db, ticker: str):
    db_stock = db.query(Stock).filter(Stock.ticker == ticker).first()

    if db_stock and is_fresh(db_stock.last_updated):
        return {"ok": True, "stock": db_stock}

    
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        
        if not info or "currentPrice" not in info:
            return {"ok": False, "reason": "invalid_stock"}

        if db_stock:
            db_stock.company_name = info.get("longName")
            db_stock.current_price = info.get("currentPrice")
            db_stock.market_cap = info.get("marketCap")
            db_stock.volume = info.get("volume"),
            db_stock.daily_change = info.get("regularMarketChangePercent")
        else:
            db_stock = Stock(
                ticker = ticker,
                company_name = info.get("longName"),
                current_price = info.get("currentPrice"),
                market_cap = info.get("marketCap"),
                last_updated = datetime.utcnow(),
                volume = info.get("volume"),
                daily_change = info.get("regularMarketChangePercent")
            )
            db.add(db_stock)

        db.commit()
        db.refresh(db_stock)
        return {"ok": True, "stock": db_stock}
    except Exception as e:
        return {"ok": False, "reason": "invalid_stock"}
    
def is_fresh(last_updated: datetime, max_age_minutes: int = 10):
    if not last_updated:
        return False
    age = datetime.utcnow() - last_updated
    return age < timedelta(minutes=max_age_minutes)
    
def search_tickers(db, query: str, limit: int = 10):
    return db.query(Stock).filter(
        or_(
            Stock.ticker.ilike(f"{query}%"),
            Stock.company_name.ilike(f"%{query}%")
        )
    ).limit(limit).all()