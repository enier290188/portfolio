from datetime import datetime
from typing import Annotated

from pydantic.config import ConfigDict
from pydantic.fields import Field
from pydantic.main import BaseModel
from pydantic.types import UUID4

FieldID = Annotated[UUID4, Field()]
FieldCreatedAt = Annotated[datetime, Field()]
FieldUpdatedAt = Annotated[datetime, Field()]


class SQLAlchemyDeclarativeBaseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID4
    created_at: datetime
    updated_at: datetime
