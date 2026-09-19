import random
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app.models.user import User
from app.models.email_verification import EmailVerification

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    VerifyEmailRequest
)

from app.utils.security import create_access_token
from app.utils.email import send_verification_email


# ==================================================
# AUTHENTICATION ROUTER
# ==================================================

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==================================================
# PASSWORD HASHING
# ==================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ==================================================
# REGISTER
# ==================================================

@router.post("/register")
async def register(
    user_data: RegisterRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    # Check whether email already exists
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:

        # If the existing account is already verified
        if existing_user.is_verified:
            return {
                "message": "Email already registered"
            }

        # If account exists but is not verified,
        # create a new verification code
        verification_code = str(
            random.randint(100000, 999999)
        )

        expires_at = (
            datetime.now(timezone.utc)
            + timedelta(minutes=10)
        )

        verification = EmailVerification(
            user_id=existing_user.id,
            code=verification_code,
            expires_at=expires_at
        )

        db.add(verification)
        db.commit()

        # Send new verification email
        background_tasks.add_task(
            send_verification_email,
            existing_user.email,
            verification_code
        )

        return {
            "message": "Account already exists but is not verified. A new verification code was sent.",
            "user_id": existing_user.id
        }

    # ==================================================
    # CREATE NEW USER
    # ==================================================

    hashed_password = pwd_context.hash(
        user_data.password
    )

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_password,
        is_verified=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # ==================================================
    # CREATE VERIFICATION CODE
    # ==================================================

    verification_code = str(
        random.randint(100000, 999999)
    )

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=10)
    )

    verification = EmailVerification(
        user_id=new_user.id,
        code=verification_code,
        expires_at=expires_at
    )

    db.add(verification)
    db.commit()

    # ==================================================
    # SEND VERIFICATION EMAIL
    # ==================================================

    background_tasks.add_task(
        send_verification_email,
        new_user.email,
        verification_code
    )

    return {
        "message": "User registered successfully. Verification code sent to your email.",
        "user_id": new_user.id
    }


# ==================================================
# LOGIN
# ==================================================

@router.post("/login")
def login(
    user_data: LoginRequest,
    db: Session = Depends(get_db)
):

    # Find user
    user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if not user:
        return {
            "message": "Invalid email or password"
        }

    # Check