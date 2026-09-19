from pydantic import BaseModel


class ResourceCreate(BaseModel):
    title: str
    description: str
    category: str
    url: str | None = None


class ResourceResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    url: str | None
    is_active: bool

    class Config:
        from_attributes = True