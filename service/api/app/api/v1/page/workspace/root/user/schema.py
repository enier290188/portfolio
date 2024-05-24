from typing import Sequence

from pydantic.main import BaseModel

from app.module.auth import (
    schema as auth_schema,
)
from app.module.user import (
    schema as user_schema,
)


class UserRequestCreate(BaseModel):
    name: user_schema.FieldName
    email: user_schema.FieldEmail
    phone: user_schema.FieldPhone
    password: user_schema.FieldPasswordHash
    is_active: user_schema.FieldIsActive
    has_permission_of_admin: user_schema.FieldHasPermissionOfAdmin
    has_permission_of_sale: user_schema.FieldHasPermissionOfSale
    has_permission_of_project: user_schema.FieldHasPermissionOfProject
    company_id: user_schema.FieldCompanyID


class UserRequestUpdate(BaseModel):
    name: user_schema.FieldName
    phone: user_schema.FieldPhone
    is_active: user_schema.FieldIsActive
    has_permission_of_admin: user_schema.FieldHasPermissionOfAdmin
    has_permission_of_sale: user_schema.FieldHasPermissionOfSale
    has_permission_of_project: user_schema.FieldHasPermissionOfProject
    company_id: user_schema.FieldCompanyID


class UserResponse(user_schema.UserResponse):
    pass


class UserItemsResponse(auth_schema.AuthResponse):
    items: Sequence[UserResponse]


class UserItemResponse(auth_schema.AuthResponse):
    item: UserResponse
