from database import engine, Base
from models import User, Stock, Post, PostLike, PostStockMention, PostAttachment

# This creates ALL tables defined in your models
Base.metadata.drop_all(bind=engine)  
Base.metadata.create_all(bind=engine) 

print("✅ Tables created successfully!")