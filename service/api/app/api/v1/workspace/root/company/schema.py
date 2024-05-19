from typing import Sequence

from pydantic.main import BaseModel

from app.module.auth import (
    schema as auth_schema,
)
from app.module.company import (
    schema as company_schema,
)


class CompanyRequestCreate(BaseModel):
    name: company_schema.FieldName
    email: company_schema.FieldEmail
    phone: company_schema.FieldPhone
    is_active: company_schema.FieldIsActive


class CompanyRequestUpdate(BaseModel):
    name: company_schema.FieldName
    email: company_schema.FieldEmail
    phone: company_schema.FieldPhone
    is_active: company_schema.FieldIsActive


class CompanyResponse(company_schema.CompanyResponse):
    pass


class CompanyItemsResponse(auth_schema.AuthResponse):
    items: Sequence[CompanyResponse]


class CompanyItemResponse(auth_schema.AuthResponse):
    item: CompanyResponse
