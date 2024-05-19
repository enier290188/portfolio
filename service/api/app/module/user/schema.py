from typing import Annotated

from pydantic.fields import Field
from pydantic.functional_validators import AfterValidator
from pydantic.networks import EmailStr
from pydantic.types import UUID4

from app.module.db import (
    schema as db_schema,
)
from app.module.user import (
    hashing as user_hashing,
)

FieldName = Annotated[str, Field(min_length=1, max_length=128)]
FieldEmail = Annotated[EmailStr, Field(min_length=1, max_length=128)]
FieldPasswordHash = Annotated[str, Field(min_length=1, max_length=32), AfterValidator(user_hashing.get_password_hash)]
FieldIsActive = Annotated[bool, Field()]
FieldHasPermissionOfRoot = Annotated[bool, Field()]
FieldHasPermissionOfAdmin = Annotated[bool, Field()]
FieldHasPermissionOfSale = Annotated[bool, Field()]
FieldHasPermissionOfProject = Annotated[bool, Field()]

FieldCompanyID = Annotated[UUID4, Field()]


class UserResponse(db_schema.SQLAlchemyDeclarativeBaseResponse):
    name: str
    email: str
    phone: str
    picture: str
    is_active: bool
    has_permission_of_root: bool
    has_permission_of_admin: bool
    has_permission_of_sale: bool
    has_permission_of_project: bool
    company_id: UUID4 | None
