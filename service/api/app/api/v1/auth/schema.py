from pydantic.main import BaseModel

from app.module.auth import (
    schema as auth_schema,
)


class LoginResponse(BaseModel):
    access_token: str


class AuthResponse(auth_schema.AuthResponse):
    pass
