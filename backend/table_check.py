# Quick check script (run in Python)
from database import engine
from sqlalchemy import inspect

inspector = inspect(engine)

# Get all table names
tables = inspector.get_table_names()
print("Tables in database:", tables)

# Check users table columns
if 'users' in tables:
    columns = inspector.get_columns('users')
    print("\nUsers table columns:")
    for col in columns:
        print(f"  - {col['name']}: {col['type']}")