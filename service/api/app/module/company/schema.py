from typing import Annotated

from app.module.db import (
    schema as db_schema,
)
from pydantic.fields import Field

FieldName = Annotated[str, Field(min_length=0, max_length=32, default='')]
FieldEmail = Annotated[str, Field(min_length=0, max_length=128, default='')]
FieldPhone = Annotated[str, Field(min_length=0, max_length=10, default='')]
FieldLogo = Annotated[str, Field(min_length=0, max_length=128, default='')]
FieldIsActive = Annotated[bool, Field(default=False)]


class CompanyResponse(db_schema.SQLAlchemyDeclarativeBaseResponse):
    name: str
    email: str
    phone: str
    logo: str
    is_active: bool
