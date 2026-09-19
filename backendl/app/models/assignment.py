from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    subject = Column(
        String(100),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    deadline = Column(
        DateTime(timezone=True),
        nullable=False
    )

    estimated_hours = Column(
        Integer,
        nullable=False
    )

    priority = Column(
        String(20),
        default="Medium",
        nullable=False
    )

    is_completed = Column(
        Boolean,
        default=False,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )