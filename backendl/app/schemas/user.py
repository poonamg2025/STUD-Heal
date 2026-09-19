from pydantic import BaseModel


class ProfileResponse(BaseModel):
    id: int
    name: str
    email: str
    is_verified: bool


class UpdateProfileRequest(BaseModel):
    name: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str