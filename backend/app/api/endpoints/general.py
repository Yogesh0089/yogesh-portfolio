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

@router.get("/logs", response_model=List[schemas.LogCreate])
def get_logs(db: Session = Depends(get_db)):
    return db.query(models.Log).order_by(models.Log.timestamp.desc()).limit(50).all()
