from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resource import Resource
from app.schemas.resource import ResourceCreate, ResourceResponse
from app.utils.security import verify_token


router = APIRouter(
    prefix="/resources",
    tags=["Support Hub"]
)

security = HTTPBearer()


# --------------------------------------------------
# GET ALL ACTIVE RESOURCES
# --------------------------------------------------

@router.get("/", response_model=list[ResourceResponse])
def get_resources(
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

    resources = db.query(Resource).filter(
        Resource.is_active == True
    ).order_by(
        Resource.id.desc()
    ).all()

    return resources


# --------------------------------------------------
# GET RESOURCES BY CATEGORY
# --------------------------------------------------

@router.get(
    "/category/{category}",
    response_model=list[ResourceResponse]
)
def get_resources_by_category(
    category: str,
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

    resources = db.query(Resource).filter(
        Resource.category == category,
        Resource.is_active == True
    ).order_by(
        Resource.id.desc()
    ).all()

    return resources


# --------------------------------------------------
# GET ONE RESOURCE
# --------------------------------------------------

@router.get(
    "/{resource_id}",
    response_model=ResourceResponse
)
def get_resource(
    resource_id: int,
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

    resource = db.query(Resource).filter(
        Resource.id == resource_id,
        Resource.is_active == True
    ).first()

    if not resource:
        raise HTTPException(
            status_code=404,
            detail="Resource not found"
        )

    return resource