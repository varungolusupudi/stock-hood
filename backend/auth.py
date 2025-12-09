import bcrypt

fake_users_db = {
    "test@example.com": {
        "email": "test@example.com",
        "password": bcrypt.hashpw("test1234".encode('utf-8'), bcrypt.gensalt())
    }
}

def get_email(db, email: str):
    if email in db:
        return db[email] 

def authenticate_user(fake_db, email: str, password: str):
    user = get_email(fake_db, email)
    if not user:
        return {"ok": False, "reason": "invalid_credentials"}

    stored_hash = user["password"]
    password_bytes = password.encode('utf-8')

    try:
        is_valid = bcrypt.checkpw(password_bytes, stored_hash)
    except Exception as e:
        return {"ok": False, "reason": "invalid_credentials"}
    
    if not is_valid:
        return {"ok": False, "reason": "invalid_credentials"}

    return {"ok": True, "user": user}

def register_user(fake_db, email: str, password: str):
    user = get_email(fake_db, email)
    if user:
        return {"ok": False, "reason": "email_already_exists"}
    
    # Validation already handled by Pydantic in RegisterSchema
    hashed_password = hash_password(password)
    new_user = {"email": email, "password": hashed_password}
    fake_db[email] = new_user
    return {"ok": True, "user": new_user}

def hash_password(password: str):
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password
