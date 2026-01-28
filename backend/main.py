from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from auth import authenticate_user, register_user
from services.stock_service import fetch_ticker, search_tickers
from jwt_utils import create_access_token, get_current_user
from database import get_db, engine
from schemas import LoginSchema, RegisterSchema, CreatePostSchema
from sqlalchemy.orm import Session
from models import Stock, User
from services import post_service

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hi"}

@app.post("/login", status_code=status.HTTP_200_OK)
def login(data: LoginSchema, db: Session = Depends(get_db)):
    result = authenticate_user(db, data.email, data.password)

    if not result["ok"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    
    user = result["user"]
    access_token = create_access_token(user.email)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": user.email,
    }

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    result = register_user(db, data.email, data.password)

    if not result["ok"]:
        reason = result.get("reason", "unknown")
        
        if reason == "email_already_exists":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed",
            )
    
    user = result["user"]
    access_token = create_access_token(user.email)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": user.email,
    }

@app.get("/dashboard")
def dashboard(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Hello {current_user.email}",
        "created_at": current_user.created_at
    }

@app.get("/stocks/search")
def search_ticker(q: str, db: Session = Depends(get_db)):
    print(f"Searching for: {q}") 
    results = search_tickers(db, q)
    print(f"Found {len(results)} results") 
    return {"results": results}

@app.get("/stocks/{ticker}")
def get_ticker(ticker: str, db: Session = Depends(get_db)):
    result = fetch_ticker(db, ticker)
    if not result["ok"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid stock or error fetching the stock",
        )
    
    stock = result["stock"]

    return {
        "stock": stock 
    }

@app.post("/posts")
def create_post(data: CreatePostSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        post = post_service.create_post(data, current_user, db)
        return post
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

