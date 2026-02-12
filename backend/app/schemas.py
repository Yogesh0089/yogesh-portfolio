from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class MessageCreate(BaseModel):
    name: str
    email: str
    content: str

class CTFCompletionCreate(BaseModel):
    challenge_id: str
    username: str

class LogCreate(BaseModel):
    event: str
    details: str
    level: str
