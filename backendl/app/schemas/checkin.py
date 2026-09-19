from pydantic import BaseModel, Field


class CheckInCreate(BaseModel):
    mood: str
    energy_level: int = Field(ge=1, le=10)
    stress_level: int = Field(ge=1, le=10)
    note: str | None = None


class CheckInResponse(BaseModel):
    id: int
    user_id: int
    mood: str
    energy_level: int
    stress_level: int
    note: str | None
    created_at: object

    class Config:
        from_attributes = True