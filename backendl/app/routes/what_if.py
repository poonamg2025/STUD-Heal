from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.what_if import WhatIfRequest
from app.services.what_if_service import calculate_what_if
from app.utils.security import verify_token


router = APIRouter(
    prefix="/what-if",
    tags=["What-If Simulator"]
)

security = HTTPBearer()


@router.post("/")
def what_if_simulator(
    data: WhatIfRequest,
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

    result = calculate_what_if(
        db,
        user_id,
        data.additional_hours,
        data.extra_days
    )

    return {
        "message": "What-If simulation completed",
        "result": result
    }