from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Boolean,
    Date,
    Numeric,
    Integer,
    Text,
    DateTime,
    ForeignKey,
    JSON,
)
from sqlalchemy.sql import func

from database import Base


# -------------------------
# USER
# -------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())


# -------------------------
# SUBJECT
# -------------------------
class Subject(Base):
    __tablename__ = "subjects"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(
        BigInteger,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(String(100), nullable=False)


# -------------------------
# ASSESSMENT
# -------------------------
class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(BigInteger, primary_key=True)
    subject_id = Column(
        BigInteger,
        ForeignKey("subjects.id", ondelete="CASCADE"),
        nullable=False,
    )
    title = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)
    due_date = Column(Date, nullable=False)
    estimated_hours = Column(Numeric(5, 2), nullable=False)
    priority = Column(String(20), default="medium")
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, server_default=func.now())


# -------------------------
# WELLBEING CHECK-IN
# -------------------------
class WellbeingCheckin(Base):
    __tablename__ = "wellbeing_checkins"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(
        BigInteger,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    workload_manageability = Column(Integer)
    stress_level = Column(Integer)
    energy_level = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())


# -------------------------
# STUDY PLAN
# -------------------------
class StudyPlan(Base):
    __tablename__ = "study_plans"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(
        BigInteger,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    plan_date = Column(Date, nullable=False)
    plan_data = Column(JSON, nullable=False)
    created_at = Column(DateTime, server_default=func.now())