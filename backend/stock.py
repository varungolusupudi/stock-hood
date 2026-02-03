from database import SessionLocal, get_db
import time
from models import Stock
from datetime import datetime
import yfinance as yf

SP500_TICKERS = [
    "A", "AAL", "AAPL", "ABBV", "ABNB", "ABT", "ACGL", "ACN", "ADBE", "ADI",
    "ADM", "ADP", "ADSK", "AEE", "AEP", "AES", "AFL", "AIG", "AIZ", "AJG",
    "AKAM", "ALB", "ALGN", "ALL", "ALLE", "AMAT", "AMCR", "AMD", "AME", "AMGN",
    "AMP", "AMT", "AMZN", "ANET", "ANSS", "AON", "AOS", "APA", "APD", "APH",
    "APTV", "ARE", "ATO", "AVB", "AVGO", "AVY", "AWK", "AXON", "AXP", "AZO",
    "BA", "BAC", "BALL", "BAX", "BBWI", "BBY", "BDX", "BEN", "BF.B", "BG",
    "BIIB", "BIO", "BK", "BKNG", "BKR", "BLDR", "BLK", "BMY", "BR", "BRK.B",
    "BRO", "BSX", "BWA", "BX", "BXP", "C", "CAG", "CAH", "CARR", "CAT",
    "CB", "CBOE", "CBRE", "CCI", "CCL", "CDNS", "CDW", "CE", "CEG", "CF",
    "CFG", "CHD", "CHRW", "CHTR", "CI", "CINF", "CL", "CLX", "CMCSA", "CME",
    "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COO", "COP", "COR", "COST",
    "CPAY", "CPB", "CPRT", "CPT", "CRL", "CRM", "CRWD", "CSCO", "CSGP", "CSX",
    "CTAS", "CTLT", "CTRA", "CTSH", "CTVA", "CVS", "CVX", "CZR", "D", "DAL",
    "DAY", "DD", "DE", "DECK", "DFS", "DG", "DGX", "DHI", "DHR", "DIS",
    "DLR", "DLTR", "DOC", "DOV", "DOW", "DPZ", "DRI", "DTE", "DUK", "DVA",
    "DVN", "DXCM", "EA", "EBAY", "ECL", "ED", "EFX", "EG", "EIX", "EL",
    "ELV", "EMN", "EMR", "ENPH", "EOG", "EPAM", "EQIX", "EQR", "EQT", "ES",
    "ESS", "ETN", "ETR", "EVRG", "EW", "EXC", "EXPD", "EXPE", "EXR", "F",
    "FANG", "FAST", "FCX", "FDS", "FDX", "FE", "FFIV", "FI", "FICO", "FIS",
    "FITB", "FLT", "FMC", "FOX", "FOXA", "FRT", "FSLR", "FTNT", "FTV", "GD",
    "GDDY", "GE", "GEHC", "GEN", "GEV", "GILD", "GIS", "GL", "GLW", "GM",
    "GNRC", "GOOG", "GOOGL", "GPC", "GPN", "GRMN", "GS", "GWW", "HAL", "HAS",
    "HBAN", "HCA", "HD", "HES", "HIG", "HII", "HLT", "HOLX", "HON", "HPE",
    "HPQ", "HRL", "HSIC", "HST", "HSY", "HUBB", "HUM", "HWM", "IBM", "ICE",
    "IDXX", "IEX", "IFF", "INCY", "INTC", "INTU", "INVH", "IP", "IPG", "IQV",
    "IR", "IRM", "ISRG", "IT", "ITW", "IVZ", "J", "JBHT", "JBL", "JCI",
    "JKHY", "JNJ", "JNPR", "JPM", "K", "KDP", "KEY", "KEYS", "KHC", "KIM",
    "KKR", "KLAC", "KMB", "KMI", "KMX", "KO", "KR", "KVUE", "L", "LDOS",
    "LEN", "LH", "LHX", "LIN", "LKQ", "LLY", "LMT", "LNT", "LOW", "LRCX",
    "LULU", "LUV", "LVS", "LW", "LYB", "LYV", "MA", "MAA", "MAR", "MAS",
    "MCD", "MCHP", "MCK", "MCO", "MDLZ", "MDT", "MET", "META", "MGM", "MHK",
    "MKC", "MKTX", "MLM", "MMC", "MMM", "MNST", "MO", "MOH", "MOS", "MPC",
    "MPWR", "MRK", "MRNA", "MRO", "MS", "MSCI", "MSFT", "MSI", "MTB", "MTCH",
    "MTD", "MU", "NCLH", "NDAQ", "NDSN", "NEE", "NEM", "NFLX", "NI", "NKE",
    "NOC", "NOW", "NRG", "NSC", "NTAP", "NTRS", "NUE", "NVDA", "NVR", "NWS",
    "NWSA", "NXPI", "O", "ODFL", "OKE", "OMC", "ON", "ORCL", "ORLY", "OTIS",
    "OXY", "PANW", "PARA", "PAYC", "PAYX", "PCAR", "PCG", "PEG", "PEP", "PFE",
    "PFG", "PG", "PGR", "PH", "PHM", "PKG", "PLD", "PM", "PNC", "PNR",
    "PNW", "PODD", "POOL", "PPG", "PPL", "PRU", "PSA", "PSX", "PTC", "PWR",
    "PYPL", "QCOM", "QRVO", "RCL", "REG", "REGN", "RF", "RJF", "RL", "RMD",
    "ROK", "ROL", "ROP", "ROST", "RSG", "RTX", "RVTY", "SBAC", "SBUX", "SCHW",
    "SHW", "SJM", "SLB", "SMCI", "SNA", "SNPS", "SO", "SOLV", "SPG", "SPGI",
    "SRE", "STE", "STLD", "STT", "STX", "STZ", "SWK", "SWKS", "SYF", "SYK",
    "SYY", "T", "TAP", "TDG", "TDY", "TECH", "TEL", "TER", "TFC", "TFX",
    "TGT", "TJX", "TMO", "TMUS", "TPR", "TRGP", "TRMB", "TROW", "TRV", "TSCO",
    "TSLA", "TSN", "TT", "TTWO", "TXN", "TXT", "TYL", "UAL", "UBER", "UDR",
    "UHS", "ULTA", "UNH", "UNP", "UPS", "URI", "USB", "V", "VICI", "VLO",
    "VLTO", "VMC", "VRSK", "VRSN", "VRTX", "VST", "VTR", "VTRS", "VZ", "WAB",
    "WAT", "WBA", "WBD", "WDC", "WEC", "WELL", "WFC", "WM", "WMB", "WMT",
    "WRB", "WST", "WTW", "WY", "WYNN", "XEL", "XOM", "XYL", "YUM", "ZBH",
    "ZBRA", "ZTS"
]

# Additional 250 Tickers (Mid-caps, Growth stocks, Popular stocks outside S&P 500)
ADDITIONAL_TICKERS = [
    # Popular Growth & Tech
    "PLTR", "SOFI", "HOOD", "RBLX", "U", "SNAP", "PINS", "SPOT", "SQ", "SHOP",
    "COIN", "ROKU", "DKNG", "PENN", "LCID", "RIVN", "NIO", "XPEV", "LI", "FSR",
    "CHPT", "BLNK", "PLUG", "FCEL", "BE", "ENVX", "QS", "SLDP", "MVST", "HYLN",
    
    # Semiconductors & Tech
    "ARM", "SMTC", "WOLF", "CRUS", "SYNA", "RMBS", "SITM", "ACLS", "FORM", "ICHR",
    "AOSL", "POWI", "DIOD", "SLAB", "LSCC", "ONTO", "AEHR", "CEVA", "AMBA", "HIMX",
    
    # Biotech & Healthcare
    "SGEN", "EXAS", "HZNP", "BMRN", "ALNY", "SRPT", "IONS", "NBIX", "UTHR", "RARE",
    "PCVX", "ARVN", "BEAM", "EDIT", "NTLA", "CRSP", "VERV", "PRME", "RCKT", "FATE",
    "IMVT", "TGTX", "KROS", "ACAD", "CRNX", "CYTK", "AXSM", "ETNB", "GERN", "IOVA",
    
    # Fintech & Financial Services
    "AFRM", "UPST", "LMND", "ROOT", "OPEN", "UWMC", "RKT", "SOFI", "LC", "TREE",
    "LPRO", "ESMT", "TOST", "BILL", "HUBS", "PCOR", "NCNO", "ALKT", "RELY", "PAYO",
    
    # Software & Cloud
    "CFLT", "MDB", "NET", "DDOG", "ZS", "OKTA", "ESTC", "GTLB", "PD", "DOCN",
    "PATH", "FRSH", "BRZE", "APPF", "ASAN", "MNDY", "CWAN", "FROG", "AI", "BIGC",
    "VTEX", "STEM", "OUST", "PWSC", "TBLA", "S", "TENB", "QLYS", "RPD", "VRNS",
    
    # E-commerce & Consumer
    "ETSY", "W", "CHWY", "WISH", "RVLV", "PRTS", "POSH", "REAL", "CVNA", "CARG",
    "CARS", "VRM", "SFT", "KMX", "LAD", "PAG", "AN", "ABG", "GPI", "SAH",
    
    # Entertainment & Media
    "SIRI", "LGF.A", "WMG", "MSGS", "MSGE", "LYV", "IMAX", "CNK", "AMC", "NFLX",
    "DIS", "WBD", "PARAA", "VIAC", "DISCA", "FOXA", "CMCSA", "SIRI", "IHRT", "GTN",
    
    # Industrial & Manufacturing
    "PATH", "LAZR", "INVZ", "MVIS", "VLDR", "AEVA", "LIDR", "CPTN", "OUST", "ASTS",
    "IRDM", "GSAT", "BKSY", "SPIR", "MNTS", "RKLB", "ASTR", "VORB", "RDW", "LLAP",
    
    # REITs & Real Estate
    "STWD", "BXMT", "NLY", "AGNC", "TWO", "MFA", "IVR", "ORC", "ARR", "NYMT",
    "PMT", "RITM", "GPMT", "LADR", "RC", "KREF", "TRTX", "ARI", "BRMK", "CMTG",
    
    # Energy & Utilities
    "FSLR", "ENPH", "SEDG", "RUN", "NOVA", "ARRY", "MAXN", "CSIQ", "JKS", "DQ",
    "FLNC", "STEM", "EOSE", "DCFC", "EVGO", "NRGV", "ORGN", "GEVO", "CLNE", "AMTX",
    
    # Cannabis & Alternative
    "TLRY", "CGC", "ACB", "CRON", "SNDL", "OGI", "HEXO", "VFF", "GRWG", "CURLF",
    "GTBIF", "TCNNF", "CRLBF", "TRSSF", "MRMD", "AYRWF", "CCHWF", "VRNOF", "GLASF", "JUSHF",
    
    # Aerospace & Defense
    "RKLB", "SPCE", "ASTR", "BKSY", "ASTS", "GSAT", "IRDM", "SPIR", "RDW", "LLAP",
    "MNTS", "VORB", "ACHR", "JOBY", "LILM", "EVTL", "BLDE", "SKYH", "ARBE", "OUST",
    
    # Mining & Materials
    "MP", "LAC", "LTHM", "ALB", "SQM", "PLL", "ALTM", "AMYZF", "OROCF", "NMTLF",
    "UUUU", "CCJ", "UEC", "DNN", "URG", "NXE", "PALAF", "GLATF", "BNNLF", "LTUM"
]

batch_size = 50
all_tickers = SP500_TICKERS + ADDITIONAL_TICKERS

db = SessionLocal()

for i in range(0, len(all_tickers), batch_size):
    batch = all_tickers[i:i+batch_size]

    for ticker_symbol in batch:
        try:
            stock = yf.Ticker(ticker_symbol)
            info = stock.info

            if not info or "longName" not in info:
                print(f"Skipping {ticker_symbol} - no data")
                continue
                
            existing = db.query(Stock).filter(Stock.ticker == ticker_symbol).first()

            if existing:
                existing.company_name = info.get("longName")
                existing.current_price = info.get("currentPrice")
                existing.market_cap = info.get("marketCap")
                existing.volume = info.get("volume"),
                existing.daily_change = info.get("regularMarketChangePercent")
            else:
                stocky = Stock(
                    ticker = ticker_symbol,
                    company_name = info.get("longName"),
                    current_price = info.get("currentPrice"),
                    market_cap = info.get("marketCap"),
                    last_updated = datetime.utcnow(),
                    volume = info.get("volume"),
                    daily_change = info.get("regularMarketChangePercent")
                )
                db.add(stocky)
        
        except Exception as e:
            print(f"✗ {ticker_symbol}: {e}")
            continue


    db.commit()
    print(f"Batch committed. Waiting for 5 secs")    

    time.sleep(5)

print("Done loading all tickers!")


