from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.checkin import CheckIn
from app.schemas.checkin import CheckInCreate, CheckInResponse
from app.utils.security import verify_token


router = APIRouter(
    prefix="/checkins",
    tags=["Wellbeing Check-ins"]
)

security = HTTPBearer()


@router.post("/", response_model=CheckInResponse)
def create_checkin(
    checkin_data: CheckInCreate,
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

    new_checkin = CheckIn(
        user_id=user_id,
        mood=checkin_data.mood,
        energy_level=checkin_data.energy_level,
        stress_level=checkin_data.stress_level,
        note=checkin_data.note
    )

    db.add(new_checkin)
    db.commit()
    db.refresh(new_checkin)

    return new_checkin


@router.get("/", response_model=list[CheckInResponse])
def get_my_checkins(
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

    checkins = db.query(CheckIn).filter(
        CheckIn.user_id == user_id
    ).order_by(
        CheckIn.id.desc()
    ).all()

    return checkins