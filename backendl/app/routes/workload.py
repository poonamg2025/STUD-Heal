from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.workload_service import calculate_workload
from app.utils.security import verify_token


router = APIRouter(
    prefix="/workload",
    tags=["Workload Analysis"]
)

security = HTTPBearer()


@router.get("/")
def get_workload(
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

    workload = calculate_workload(
        db,
        user_id
    )

    return workload