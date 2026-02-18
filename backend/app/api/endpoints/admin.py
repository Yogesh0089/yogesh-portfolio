from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.api.deps import get_current_admin
from app.db import get_db

router = APIRouter(dependencies=[Depends(get_current_admin)])

# --- Projects CRUD ---
@router.post("/projects", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    for key, value in project.dict().items():
        setattr(db_project, key, value)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted"}

# --- Skills CRUD ---
@router.post("/skills", response_model=schemas.Skill)
def create_skill(skill: schemas.SkillCreate, db: Session = Depends(get_db)):
    db_skill = models.Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    db_skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted"}

# --- About Content ---
@router.get("/about", response_model=schemas.AboutContent)
def get_about(db: Session = Depends(get_db)):
    about = db.query(models.AboutContent).first()
    if not about:
        # Create default if none exists
        about = models.AboutContent(
            intro="Backend Engineer & Ethical Hacker",
            role="Security Research @ Antigravity",
            experience="5+ years in defensive and offensive security."
        )
        db.add(about)
        db.commit()
        db.refresh(about)
    return about

@router.put("/about", response_model=schemas.AboutContent)
def update_about(about: schemas.AboutContentCreate, db: Session = Depends(get_db)):
    db_about = db.query(models.AboutContent).first()
    if not db_about:
        db_about = models.AboutContent(**about.dict())
        db.add(db_about)
    else:
        for key, value in about.dict().items():
            setattr(db_about, key, value)
    db.commit()
    db.refresh(db_about)
    return db_about

# --- Operations / Logs ---
@router.get("/messages")
def get_messages(db: Session = Depends(get_db)):
    return db.query(models.Message).order_by(models.Message.created_at.desc()).all()

@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    return db.query(models.Log).order_by(models.Log.timestamp.desc()).limit(100).all()
