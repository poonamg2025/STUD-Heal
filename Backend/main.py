from datetime import date

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

from database import SessionLocal
from models import User, Subject, Assessment

from workload_engine import (
    get_user_workload,
    calculate_overall_workload,
)

from study_planner import create_study_plan

from wellbeing_engine import (
    save_wellbeing_checkin,
    get_user_checkins,
)

from support_engine import (
    create_support_plan,
)

from adaptive_planner import (
    calculate_adaptive_plan,
)

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user_id,
)


app = FastAPI(
    title="STUDHeal API",
    description="Student wellbeing and workload support API",
    version="1.0.0",
)


class StudyPlanRequest(BaseModel):
    title: str
    estimated_hours: float
    due_date: date


class SubjectRequest(BaseModel):
    name: str


class AssessmentRequest(BaseModel):
    subject_id: int
    title: str
    type: str
    due_date: date
    estimated_hours: float
    priority: str = "medium"


class WellbeingCheckinRequest(BaseModel):
    workload_manageability: int
    stress_level: int
    energy_level: int


class RegisterRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@app.get("/")
def home():
    return {
        "message": "STUDHeal API is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# AUTHENTICATION
# --------------------------------------------------


@app.post("/auth/register")
def register_user(
    request: RegisterRequest
):
    db = SessionLocal()

    try:
        existing_user = (
            db.query(User)
            .filter(
                User.email == request.email
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered",
            )

        if len(request.password) < 6:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Password must contain "
                    "at least 6 characters"
                ),
            )

        hashed_password = hash_password(
            request.password
        )

        user = User(
            email=request.email,
            password_hash=hashed_password,
            email_verified=False,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "message": "User registered successfully",
            "user_id": user.id,
            "email": user.email,
        }

    finally:
        db.close()


@app.post("/auth/login")
def login_user(
    request: LoginRequest
):
    db = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(
                User.email == request.email
            )
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        if not verify_password(
            request.password,
            user.password_hash,
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        access_token = create_access_token(
            user.id
        )

        return {
            "message": "Login successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.id,
        }

    finally:
        db.close()


@app.get("/auth/me")
def get_my_profile(
    user_id: int = Depends(
        get_current_user_id
    )
):
    db = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(
                User.id == user_id
            )
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        return {
            "user_id": user.id,
            "email": user.email,
            "email_verified": user.email_verified,
        }

    finally:
        db.close()


# --------------------------------------------------
# SUBJECTS
# --------------------------------------------------


@app.post("/subjects")
def create_subject(
    request: SubjectRequest,
    user_id: int = Depends(
        get_current_user_id
    ),
):
    db = SessionLocal()

    try:
        subject = Subject(
            user_id=user_id,
            name=request.name,
        )

        db.add(subject)
        db.commit()
        db.refresh(subject)

        return {
            "message": "Subject created successfully",
            "subject_id": subject.id,
            "user_id": subject.user_id,
            "name": subject.name,
        }

    finally:
        db.close()


@app.get("/subjects")
def get_subjects(
    user_id: int = Depends(
        get_current_user_id
    )
):
    db = SessionLocal()

    try:
        subjects = (
            db.query(Subject)
            .filter(
                Subject.user_id == user_id
            )
            .all()
        )

        return [
            {
                "id": subject.id,
                "name": subject.name,
            }
            for subject in subjects
        ]

    finally:
        db.close()


# --------------------------------------------------
# ASSESSMENTS
# --------------------------------------------------


@app.post("/assessments")
def create_assessment(
    request: AssessmentRequest,
    user_id: int = Depends(
        get_current_user_id
    ),
):
    db = SessionLocal()

    try:
        subject = (
            db.query(Subject)
            .filter(
                Subject.id == request.subject_id,
                Subject.user_id == user_id,
            )
            .first()
        )

        if not subject:
            raise HTTPException(
                status_code=404,
                detail="Subject not found",
            )

        assessment = Assessment(
            subject_id=request.subject_id,
            title=request.title,
            type=request.type,
            due_date=request.due_date,
            estimated_hours=request.estimated_hours,
            priority=request.priority,
            status="pending",
        )

        db.add(assessment)
        db.commit()
        db.refresh(assessment)

        return {
            "message": "Assessment created successfully",
            "assessment_id": assessment.id,
            "title": assessment.title,
            "subject_id": assessment.subject_id,
            "due_date": assessment.due_date,
            "estimated_hours": float(
                assessment.estimated_hours
            ),
            "priority": assessment.priority,
            "status": assessment.status,
        }

    finally:
        db.close()


@app.get("/assessments/{subject_id}")
def get_assessments(
    subject_id: int,
    user_id: int = Depends(
        get_current_user_id
    ),
):
    db = SessionLocal()

    try:
        subject = (
            db.query(Subject)
            .filter(
                Subject.id == subject_id,
                Subject.user_id == user_id,
            )
            .first()
        )

        if not subject:
            raise HTTPException(
                status_code=404,
                detail="Subject not found",
            )

        assessments = (
            db.query(Assessment)
            .filter(
                Assessment.subject_id == subject_id
            )
            .all()
        )

        return [
            {
                "id": assessment.id,
                "title": assessment.title,
                "type": assessment.type,
                "due_date": assessment.due_date,
                "estimated_hours": float(
                    assessment.estimated_hours
                ),
                "priority": assessment.priority,
                "status": assessment.status,
            }
            for assessment in assessments
        ]

    finally:
        db.close()


# --------------------------------------------------
# WORKLOAD
# --------------------------------------------------


@app.get("/workload")
def get_workload(
    user_id: int = Depends(
        get_current_user_id
    )
):
    return {
        "user_id": user_id,
        "workload": get_user_workload(
            user_id
        ),
    }


@app.get("/workload-summary")
def get_workload_summary(
    user_id: int = Depends(
        get_current_user_id
    )
):
    return {
        "user_id": user_id,
        "summary": calculate_overall_workload(
            user_id
        ),
    }


# --------------------------------------------------
# STUDY PLAN
# --------------------------------------------------


@app.post("/study-plan")
def generate_study_plan(
    request: StudyPlanRequest,
    user_id: int = Depends(
        get_current_user_id
    ),
):
    plan = create_study_plan(
        title=request.title,
        estimated_hours=request.estimated_hours,
        due_date=request.due_date,
    )

    return {
        "user_id": user_id,
        "title": request.title,
        "plan": plan,
    }


# --------------------------------------------------
# WELLBEING
# --------------------------------------------------


@app.post("/wellbeing/checkin")
def create_wellbeing_checkin(
    request: WellbeingCheckinRequest,
    user_id: int = Depends(
        get_current_user_id
    ),
):
    if not 1 <= request.workload_manageability <= 5:
        raise HTTPException(
            status_code=400,
            detail=(
                "workload_manageability "
                "must be between 1 and 5"
            ),
        )

    if not 1 <= request.stress_level <= 5:
        raise HTTPException(
            status_code=400,
            detail=(
                "stress_level "
                "must be between 1 and 5"
            ),
        )

    if not 1 <= request.energy_level <= 5:
        raise HTTPException(
            status_code=400,
            detail=(
                "energy_level "
                "must be between 1 and 5"
            ),
        )

    return save_wellbeing_checkin(
        user_id=user_id,
        workload_manageability=(
            request.workload_manageability
        ),
        stress_level=request.stress_level,
        energy_level=request.energy_level,
    )


@app.get("/wellbeing/checkins")
def get_wellbeing_checkins(
    user_id: int = Depends(
        get_current_user_id
    )
):
    return {
        "user_id": user_id,
        "checkins": get_user_checkins(
            user_id
        ),
    }


# --------------------------------------------------
# PERSONALIZED SUPPORT PLAN
# --------------------------------------------------


@app.get("/support-plan")
def get_support_plan(
    user_id: int = Depends(
        get_current_user_id
    )
):
    return create_support_plan(
        user_id
    )


# --------------------------------------------------
# WHAT-IF SIMULATOR
# --------------------------------------------------


@app.get("/what-if/{assessment_id}")
def what_if_simulation(
    assessment_id: int,
    postponed_days: int = 0,
    user_id: int = Depends(
        get_current_user_id
    ),
):
    if postponed_days < 0:
        raise HTTPException(
            status_code=400,
            detail="postponed_days cannot be negative",
        )

    if postponed_days > 30:
        raise HTTPException(
            status_code=400,
            detail="postponed_days cannot be greater than 30",
        )

    db = SessionLocal()

    try:
        assessment = (
            db.query(Assessment)
            .join(
                Subject,
                Assessment.subject_id == Subject.id,
            )
            .filter(
                Assessment.id == assessment_id,
                Subject.user_id == user_id,
            )
            .first()
        )

        if not assessment:
            raise HTTPException(
                status_code=404,
                detail="Assessment not found",
            )

    finally:
        db.close()

    result = calculate_adaptive_plan(
        assessment_id=assessment_id,
        postponed_days=postponed_days,
    )

    if "error" in result:
        raise HTTPException(
            status_code=404,
            detail=result["error"],
        )

    return result