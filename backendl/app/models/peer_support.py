from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class PeerProfile(Base):
    __tablename__ = "peer_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    is_opted_in = Column(
        Boolean,
        default=False,
        nullable=False
    )

    support_topic = Column(
        String(100),
        nullable=True
    )

    study_area = Column(
        String(100),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )