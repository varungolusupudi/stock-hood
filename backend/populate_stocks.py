"""
Script to populate the database with stock tickers.
Run with: python populate_stocks.py
"""
import yfinance as yf
from database import SessionLocal, engine
from models import Stock, Base
from datetime import datetime
import time

# Popular US stocks - add/remove as needed
TICKERS = [
    # Tech Giants
    "AAPL", "MSFT", "GOOGL", "GOOG", "AMZN", "META", "NVDA", "TSLA", "AMD", "INTC",
    "CRM", "ORCL", "ADBE", "CSCO", "IBM", "QCOM", "TXN", "AVGO", "NOW", "SNOW",
    "UBER", "LYFT", "ABNB", "DASH", "SQ", "PYPL", "SHOP", "SPOT", "NFLX", "DIS",
    
    # Finance
    "JPM", "BAC", "WFC", "GS", "MS", "C", "BLK", "SCHW", "AXP", "V", "MA", "COF",
    
    # Healthcare
    "JNJ", "UNH", "PFE", "MRK", "ABBV", "LLY", "TMO", "ABT", "BMY", "AMGN",
    "GILD", "MRNA", "BIIB", "REGN", "VRTX",
    
    # Consumer
    "WMT", "COST", "HD", "LOW", "TGT", "NKE", "SBUX", "MCD", "KO", "PEP",
    "PG", "CL", "KMB", "EL", "LULU",
    
    # Industrial / Energy
    "XOM", "CVX", "COP", "SLB", "EOG", "BA", "CAT", "GE", "HON", "UPS", "FDX",
    "LMT", "RTX", "NOC", "DE",
    
    # Automotive
    "F", "GM", "RIVN", "LCID", "NIO", "LI", "XPEV",
    
    # Semiconductors
    "MU", "LRCX", "KLAC", "AMAT", "MRVL", "ON", "NXPI", "ADI", "MCHP",
    
    # Communication / Media
    "T", "VZ", "TMUS", "CMCSA", "CHTR", "WBD", "PARA", "FOX",
    
    # Real Estate / REITs
    "AMT", "PLD", "CCI", "EQIX", "SPG", "O", "WELL",
    
    # Crypto-related
    "COIN", "MSTR", "RIOT", "MARA",
    
    # Other popular
    "BRK-B", "SPY", "QQQ", "IWM", "DIA", "VOO", "VTI",
]

def populate_stocks():
    db = SessionLocal()
    success_count = 0
    fail_count = 0
    
    print(f"Populating {len(TICKERS)} stocks...")
    print("-" * 50)
    
    for i, ticker in enumerate(TICKERS):
        try:
            # Check if already exists
            existing = db.query(Stock).filter(Stock.ticker == ticker).first()
            if existing:
                print(f"[{i+1}/{len(TICKERS)}] {ticker}: Already exists, skipping")
                continue
            
            # Fetch from yfinance
            stock = yf.Ticker(ticker)
            info = stock.info
            
            if not info or "currentPrice" not in info:
                print(f"[{i+1}/{len(TICKERS)}] {ticker}: No price data, skipping")
                fail_count += 1
                continue
            
            # Create stock record
            db_stock = Stock(
                ticker=ticker,
                company_name=info.get("longName") or info.get("shortName") or ticker,
                current_price=info.get("currentPrice"),
                market_cap=info.get("marketCap"),
                volume=info.get("volume"),
                daily_change=info.get("regularMarketChangePercent"),
                last_updated=datetime.utcnow(),
            )
            db.add(db_stock)
            db.commit()
            
            print(f"[{i+1}/{len(TICKERS)}] {ticker}: {db_stock.company_name} - ${db_stock.current_price}")
            success_count += 1
            
            # Small delay to avoid rate limiting
            time.sleep(0.2)
            
        except Exception as e:
            print(f"[{i+1}/{len(TICKERS)}] {ticker}: Error - {str(e)[:50]}")
            fail_count += 1
            db.rollback()
    
    db.close()
    
    print("-" * 50)
    print(f"Done! Added {success_count} stocks, {fail_count} failed")

if __name__ == "__main__":
    populate_stocks()
