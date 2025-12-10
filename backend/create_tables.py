from database import engine, Base
from models import User  # This imports the User model

# This creates ALL tables defined in your models
Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")