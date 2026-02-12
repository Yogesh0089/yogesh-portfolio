import sys
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
