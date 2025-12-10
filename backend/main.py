from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from auth import authenticate_user, register_user
from database import get_db, engine
from schemas import LoginSchema, RegisterSchema
from sqlalchemy.orm import Session

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

    return {
        "success": True,
        "message": "Logged in",
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

    return {
        "success": True,
        "message": "Account created",
        "email": user.email,
    }
    