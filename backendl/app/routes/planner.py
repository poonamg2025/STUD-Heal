from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.planner_service import generate_study_plan
from app.utils.security import verify_token


router = APIRouter(
    prefix="/planner",
    tags=["Study Planner"]
)

security = HTTPBearer()


@router.get("/")
def get_study_plan(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    study_plan = generate_study_plan(
        db,
        user_id
    )

    return {
        "message": "Study plan generated successfully",
        "study_plan": study_plan
    }