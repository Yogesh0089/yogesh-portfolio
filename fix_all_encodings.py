import os

files_to_fix = {
    'backend/app/db.py': """import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'sqlite:///./cyber_portfolio.db'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
""",
    'backend/init_db.py': """import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db import SessionLocal
from app import models
from app.core import security

def init_db():
    db = SessionLocal()
    # Create admin user
    try:
        admin_user = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin_user:
            hashed_password = security.get_password_hash("cyber_secure_2026")
            admin = models.User(username="admin", hashed_password=hashed_password)
            db.add(admin)
            db.commit()
            print("Admin user created: admin / cyber_secure_2026")
    except Exception as e:
        print(f"Init error: {e}")

if __name__ == "__main__":
    init_db()
""",
    'backend/app/main.py': """from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, general

app = FastAPI(title="Cyber Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(general.router, prefix="/api", tags=["general"])

@app.get("/")
async def root():
    return {"message": "System Online", "status": "Secure"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
"""
}

for path, content in files_to_fix.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed encoding for {path}")
