from datetime import datetime
from typing import Annotated

from pydantic.fields import Field
from pydantic.main import BaseModel
from pydantic.types import UUID4

from app.module.auth import (
    schema as auth_schema,
)
from app.module.user import (
    schema as user_schema,
)


class SyncResponse(auth_schema.AuthResponse):
    pass


class LoginResponse(BaseModel):
    access_token: str


class ProfileResponse(user_schema.UserResponse):
    created_at: Annotated[datetime, Field(exclude=True)]
    updated_at: Annotated[datetime, Field(exclude=True)]

    is_active: Annotated[bool, Field(exclude=True)]
    has_permission_of_root: Annotated[bool, Field(exclude=True)]
    has_permission_of_admin: Annotated[bool, Field(exclude=True)]
    has_permission_of_sale: Annotated[bool, Field(exclude=True)]
    has_permission_of_project: Annotated[bool, Field(exclude=True)]

    company_id: Annotated[UUID4 | None, Field(exclude=True)]
