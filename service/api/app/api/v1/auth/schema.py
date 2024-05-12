from app.module.auth import (
    schema as auth_schema,
)
from pydantic.main import BaseModel


class LoginResponse(BaseModel):
    access_token: str


class ProfileResponse(auth_schema.AuthResponse):
    pass
