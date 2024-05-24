from pydantic.main import BaseModel
from pydantic.types import UUID4

from app.module.auth import (
    schema as auth_schema,
)


class SyncRequest(BaseModel):
    id: UUID4


class SyncResponse(auth_schema.AuthResponse):
    pass
