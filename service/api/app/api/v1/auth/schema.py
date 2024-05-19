from app.module.auth import (
    schema as auth_schema,
)
from pydantic.main import BaseModel


class LoginResponse(BaseModel):
    access_token: str


class AuthResponse(auth_schema.AuthResponse):
    pass
