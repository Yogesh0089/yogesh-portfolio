from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: str
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    class Config:
        orm_mode = True

class SkillBase(BaseModel):
    name: str
    category: str
    level: int

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    id: int
    class Config:
        orm_mode = True

class AboutContentBase(BaseModel):
    intro: str
    role: str
    profile_image: Optional[str] = None
    experience: str

class AboutContentCreate(AboutContentBase):
    pass

class AboutContent(AboutContentBase):
    id: int
    class Config:
        orm_mode = True

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
