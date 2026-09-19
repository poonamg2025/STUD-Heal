from pydantic import BaseModel


class PeerProfileCreate(BaseModel):
    support_topic: str
    study_area: str


class PeerProfileResponse(BaseModel):
    id: int
    user_id: int
    is_opted_in: bool
    support_topic: str | None
    study_area: str | None

    class Config:
        from_attributes = True