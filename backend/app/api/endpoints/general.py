from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.db import get_db

router = APIRouter()

@router.post("/contact")
def create_message(message: schemas.MessageCreate, db: Session = Depends(get_db)):
    db_message = models.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    # Log the event
    new_log = models.Log(event="MESSAGE_SENT", details=f"From: {message.email}", level="INFO")
    db.add(new_log)
    db.commit()
    return {"status": "success", "message": "Signal transmitted."}

@router.post("/ctf/complete")
def complete_challenge(completion: schemas.CTFCompletionCreate, db: Session = Depends(get_db)):
    db_completion = models.CTFCompletion(**completion.dict())
    db.add(db_completion)
    db.commit()
    # Log the event
    new_log = models.Log(event="CHALLENGE_SOLVED", details=f"Challenge: {completion.challenge_id} by {completion.username}", level="WARNING")
    db.add(new_log)
    db.commit()
    return {"status": "success", "message": "Access Granted."}

@router.get("/projects", response_model=List[schemas.Project])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

@router.get("/skills", response_model=List[schemas.Skill])
def get_skills(db: Session = Depends(get_db)):
    return db.query(models.Skill).all()

@router.get("/about", response_model=schemas.AboutContent)
def get_about(db: Session = Depends(get_db)):
    about = db.query(models.AboutContent).first()
    if not about:
        return {
            "id": 0,
            "intro": "Welcome to my secure portfolio.",
            "role": "Security Professional",
            "profile_image": None,
            "experience": "Researching threats and building secure systems."
        }
    return about
