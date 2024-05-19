from typing import Annotated

from app.module.db import (
    schema as db_schema,
)
from pydantic.fields import Field

FieldName = Annotated[str, Field(min_length=1, max_length=32)]
FieldEmail = Annotated[str, Field(min_length=0, max_length=128)]
FieldPhone = Annotated[str, Field(min_length=0, max_length=10)]
FieldLogo = Annotated[str, Field(min_length=0, max_length=128)]
FieldIsActive = Annotated[bool, Field()]


class CompanyResponse(db_schema.SQLAlchemyDeclarativeBaseResponse):
    name: str
    email: str
    phone: str
    logo: str
    is_active: bool
