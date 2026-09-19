from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.peer_support import PeerProfile
from app.schemas.peer_support import (
    PeerProfileCreate,
    PeerProfileResponse
)
from app.utils.security import verify_token


router = APIRouter(
    prefix="/peer-support",
    tags=["Peer Support"]
)

security = HTTPBearer()


# ==================================================
# JOIN PEER SUPPORT
# ==================================================

@router.post(
    "/join",
    response_model=PeerProfileResponse
)
def join_peer_support(
    profile_data: PeerProfileCreate,
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

    existing_profile = db.query(PeerProfile).filter(
        PeerProfile.user_id == user_id
    ).first()

    if existing_profile:

        existing_profile.is_opted_in = True
        existing_profile.support_topic = profile_data.support_topic
        existing_profile.study_area = profile_data.study_area

        db.commit()
        db.refresh(existing_profile)

        return existing_profile

    new_profile = PeerProfile(
        user_id=user_id,
        is_opted_in=True,
        support_topic=profile_data.support_topic,
        study_area=profile_data.study_area
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


# ==================================================
# GET MY PEER PROFILE
# ==================================================

@router.get(
    "/me",
    response_model=PeerProfileResponse
)
def get_my_peer_profile(
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

    profile = db.query(PeerProfile).filter(
        PeerProfile.user_id == user_id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Peer profile not found"
        )

    return profile


# ==================================================
# FIND PEERS
# ==================================================

@router.get("/matches")
def find_peer_matches(
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

    # Get current user's peer profile
    my_profile = db.query(PeerProfile).filter(
        PeerProfile.user_id == user_id
    ).first()

    if not my_profile:
        raise HTTPException(
            status_code=404,
            detail="Please join Peer Support first"
        )

    if not my_profile.is_opted_in:
        raise HTTPException(
            status_code=403,
            detail="You are currently opted out of Peer Support"
        )

    # Find other opted-in users
    peers = db.query(PeerProfile).filter(
        PeerProfile.user_id != user_id,
        PeerProfile.is_opted_in == True
    ).all()

    matches = []

    for peer in peers:

        score = 0
        match_reasons = []

        # Same support topic
        if (
            peer.support_topic
            and my_profile.support_topic
            and peer.support_topic.lower()
            == my_profile.support_topic.lower()
        ):
            score += 2
            match_reasons.append(
                "Same support topic"
            )

        # Same study area
        if (
            peer.study_area
            and my_profile.study_area
            and peer.study_area.lower()
            == my_profile.study_area.lower()
        ):
            score += 1
            match_reasons.append(
                "Same study area"
            )

        # Only include users with at least one match
        if score > 0:

            matches.append({
                "peer_id": peer.id,
                "support_topic": peer.support_topic,
                "study_area": peer.study_area,
                "match_score": score,
                "match_reasons": match_reasons
            })

    # Highest matching score first
    matches.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return {
        "message": "Peer matches found",
        "total_matches": len(matches),
        "matches": matches
    }


# ==================================================
# OPT OUT
# ==================================================

@router.put("/opt-out")
def opt_out_peer_support(
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

    profile = db.query(PeerProfile).filter(
        PeerProfile.user_id == user_id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Peer profile not found"
        )

    profile.is_opted_in = False

    db.commit()

    return {
        "message": "You have opted out of Peer Support"
    }