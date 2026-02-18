from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
try:
    h = pwd_context.hash("test")
    print(f"Hashed: {h}")
except Exception as e:
    print(f"Error: {e}")
