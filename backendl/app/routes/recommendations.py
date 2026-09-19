from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.recommendation_service import generate_recommendations
from app.utils.security import verify_token


router = APIRouter(
    prefix="/recommendations",
    tags=["AI Recommendations"]
)


security = HTTPBearer()


@router.get("/")
def get_recommendations(
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

    recommendations = generate_recommendations(
        db,
        user_id
    )

    return {
        "message": "Recommendations generated successfully",
        "data": recommendations
    }