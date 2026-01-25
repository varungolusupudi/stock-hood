import re
from pydantic import BaseModel, EmailStr, Field, field_validator, List, Optional
from models import SentimentEnum

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

class AttachmentCreate(BaseModel):
    file_url: str
    file_type: str
    file_size: Optional[int] = None
    width: Optional[int] = None
    height: Optional[int] = None

class CreatePostSchema(BaseModel):
    content: Optional[str] = None
    sentiment: Optional[SentimentEnum] = None
    attachments: List[AttachmentCreate] = []
    parent_post_id: Optional[int] = None
    repost_of_id: Optional[int] = None
    tickers: Optional[List[str]] = None

    @field_validator('content')
    @classmethod
    def validate_content(cls, v, info):
        values = info.data

        if values.get('repost_of_id'):
            return v
        
        if not v or not v.strip():
            raise ValueError('Content is required for posts and comments')
        
        if len(v) > 1000:
            raise ValueError('Content must be less than 1000 characters')
        
        return v

    @field_validator('repost_of_id')
    @classmethod
    def validate_mutual_exclusion(cls, v, info):
        # Cannot be both a comment and a repost
        if v and info.data.get('parent_post_id'):
            raise ValueError('Cannot create a post that is both a comment and a repost')
        return v