from datetime import datetime
from typing import Annotated

from pydantic.fields import Field
from pydantic.main import BaseModel

from app.module.user import (
    schema as user_schema,
)


class AuthUserResponse(user_schema.UserResponse):
    created_at: Annotated[datetime, Field(exclude=True)]
    updated_at: Annotated[datetime, Field(exclude=True)]

    is_active: Annotated[bool, Field(exclude=True)]


class AuthAccessTokenAndUserResponse(BaseModel):
    access_token: str
    user: AuthUserResponse


class AuthResponse(BaseModel):
    auth: AuthAccessTokenAndUserResponse
