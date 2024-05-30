from typing import Annotated

from app.module.db import (
    schema as db_schema,
)
from pydantic.fields import Field
from pydantic.types import UUID4

FieldName = Annotated[str, Field(min_length=0, max_length=32, default='')]
FieldEmail = Annotated[str, Field(min_length=0, max_length=128, default='')]
FieldPhone = Annotated[str, Field(min_length=0, max_length=10, default='')]
FieldCompanyID = Annotated[UUID4 | None, Field(default=None)]
FieldUserSaleID = Annotated[UUID4 | None, Field(default=None)]
FieldUserProjectID = Annotated[UUID4 | None, Field(default=None)]


class DealResponse(db_schema.SQLAlchemyDeclarativeBaseResponse):
    name: str
    email: str
    phone: str

    company_id: UUID4 | None
    user_sale_id: UUID4 | None
    user_project_id: UUID4 | None
