from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from app.db import Base, engine
import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    tech_stack = Column(String) # Comma separated
    image_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)

class Skill(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String) # e.g., Languages, Frameworks, Security
    level = Column(Integer, default=90)

class AboutContent(Base):
    __tablename__ = 'about_content'
    id = Column(Integer, primary_key=True, index=True)
    intro = Column(Text)
    role = Column(String)
    profile_image = Column(String, nullable=True)
    experience = Column(Text) # JSON or structured text

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
