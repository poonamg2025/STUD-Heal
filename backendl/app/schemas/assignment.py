from pydantic import BaseModel
from datetime import datetime


class AssignmentCreate(BaseModel):
    title: str
    subject: str
    description: str | None = None
    deadline: datetime
    estimated_hours: int
    priority: str = "Medium"


class AssignmentResponse(BaseModel):
    id: int
    user_id: int
    title: str
    subject: str
    description: str | None
    deadline: datetime
    estimated_hours: int
    priority: str
    is_completed: bool

    class Config:
        from_attributes = True