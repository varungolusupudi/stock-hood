from sqlalchemy.orm import Session
from models import UserWatchlist, User, Stock 

def add_to_watchlist(stock_ticker: str, user: User, db: Session):
    # Check if stock exists
    stock = db.query(Stock).filter(Stock.ticker == stock_ticker).first()
    if not stock:
        raise ValueError("Stock not found")

    # Check if stock is already in watchlist
    existing = db.query(UserWatchlist).filter(UserWatchlist.user_id == user.id).filter(UserWatchlist.stock_id == stock.id).first()
    if existing:
        raise ValueError("Stock already in watchlist")

    # Add stock to watchlist
    watchlist_item = UserWatchlist(
        stock_id=stock.id,
        user_id=user.id
    )
    db.add(watchlist_item)
    db.commit()
    db.refresh(watchlist_item)
    return watchlist_item

def get_watchlist(user: User, db: Session):
    results = (
        db.query(UserWatchlist, Stock)
        .join(Stock, UserWatchlist.stock_id == Stock.id)
        .filter(UserWatchlist.user_id == user.id)
        .order_by(UserWatchlist.added_at.desc())
        .all()
    )

    return [
        {
            "ticker": stock.ticker,
            "company_name": stock.company_name,
            "current_price": stock.current_price,
            "daily_change": stock.daily_change,
            "weekly_change": stock.weekly_change,
            "added_at": item.added_at
        }
        for item, stock in results
    ]

def remove_from_watchlist(stock_ticker: str, user: User, db: Session):
    stock = db.query(Stock).filter(Stock.ticker == stock_ticker).first()
    if not stock:
        raise ValueError("Stock not found")
    
    watchlist_item = db.query(UserWatchlist).filter(UserWatchlist.user_id == user.id).filter(UserWatchlist.stock_id == stock.id).first()
    if not watchlist_item:
        raise ValueError("Stock not in watchlist")
    if watchlist_item.user_id != user.id:
        raise ValueError("You are not authorized to remove this stock from your watchlist")
    
    db.delete(watchlist_item)
    db.commit()
    return watchlist_item