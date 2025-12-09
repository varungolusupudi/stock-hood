import re
from pydantic import BaseModel, EmailStr, Field, field_validator

class LoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=100)

class RegisterSchema(BaseModel):
    email: EmailStr
    password: str = Field(
        min_length=8, 
        max_length=50,
        description="Password must be 8-50 characters"
    )
    password_confirm: str = Field(
        min_length=8,
        max_length=50
    )
    
    @field_validator('password_confirm')
    @classmethod
    def passwords_match(cls, v, info):
        if 'password' in info.data and v != info.data['password']:
            raise ValueError('Passwords do not match')
        return v
        
    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least one number')
        return v