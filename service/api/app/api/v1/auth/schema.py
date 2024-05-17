from app.module.auth import (
    schema as auth_schema,
)
from pydantic.main import BaseModel


class AuthResponse(auth_schema.AuthResponse):
    pass


class LoginResponse(BaseModel):
    access_token: str
