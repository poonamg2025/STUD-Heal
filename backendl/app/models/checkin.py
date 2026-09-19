from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class CheckIn(Base):
    __tablename__ = "checkins"

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

    mood = Column(
        String(20),
        nullable=False
    )

    energy_level = Column(
        Integer,
        nullable=False
    )

    stress_level = Column(
        Integer,
        nullable=False
    )

    note = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )