from typing import Annotated

from app.module.db import (
    schema as db_schema,
)
from pydantic.fields import Field

FieldName = Annotated[str, Field(min_length=1, max_length=128)]
FieldIsActive = Annotated[bool, Field()]


class CompanyResponse(db_schema.SQLAlchemyDeclarativeBaseResponse):
    name: str
    is_active: bool
