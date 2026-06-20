from sqlalchemy import text
from app.database import engine

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        print(result.fetchone()[0])
        print("✅ Connected successfully!")

except Exception as e:
    print("❌ Connection Failed")
    print(e)