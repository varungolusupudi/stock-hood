import bcrypt
from models import User

def authenticate_user(db, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return {"ok": False, "reason": "invalid_credentials"}

    stored_hash = user.hashed_password.encode('utf-8')
    password_bytes = password.encode('utf-8')

    try:
        is_valid = bcrypt.checkpw(password_bytes, stored_hash)
    except Exception as e:
        return {"ok": False, "reason": "invalid_credentials"}
    
    if not is_valid:
        return {"ok": False, "reason": "invalid_credentials"}

    return {"ok": True, "user": user}

def register_user(db, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        return {"ok": False, "reason": "email_already_exists"}
    
    # Validation already handled by Pydantic in RegisterSchema
    hashed_password = hash_password(password)
    new_user = User(email=email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"ok": True, "user": new_user}

def hash_password(password: str):
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password.decode('utf-8')
