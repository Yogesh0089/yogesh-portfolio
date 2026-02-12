from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from app.db import Base, engine
import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CTFCompletion(Base):
    __tablename__ = 'ctf_completions'
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(String)
    username = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class Log(Base):
    __tablename__ = 'logs'
    id = Column(Integer, primary_key=True, index=True)
    event = Column(String)
    details = Column(String)
    level = Column(String) # INFO, WARNING, CRITICAL
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)
