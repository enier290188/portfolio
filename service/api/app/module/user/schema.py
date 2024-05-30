from typing import Annotated

from app.module.db import (
    schema as db_schema,
)
from app.module.user import (
    hashing as user_hashing,
)
from pydantic.fields import Field
from pydantic.functional_validators import AfterValidator
from pydantic.networks import EmailStr
from pydantic.types import UUID4

FieldName = Annotated[str, Field(min_length=0, max_length=32, default='')]
FieldEmail = Annotated[EmailStr, Field(min_length=5, max_length=128)]
FieldPhone = Annotated[str, Field(min_length=0, max_length=10, default='')]
FieldPicture = Annotated[str, Field(min_length=0, max_length=128, default='')]
FieldPasswordHash = Annotated[str, Field(min_length=8, max_length=24), AfterValidator(user_hashing.get_password_hash)]
FieldIsActive = Annotated[bool, Field(default=False)]
FieldHasPermissionOfRoot = Annotated[bool, Field(default=False)]
FieldHasPermissionOfAdmin = Annotated[bool, Field(default=False)]
FieldHasPermissionOfSale = Annotated[bool, Field(default=False)]
FieldHasPermissionOfProject = Annotated[bool, Field(default=False)]
FieldCompanyID = Annotated[UUID4 | None, Field(default=None)]


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
