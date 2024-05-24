from pydantic.main import BaseModel

from app.module.auth import (
    schema as auth_schema,
)
from app.module.company import (
    schema as company_schema,
)


class CompanyRequestUpdate(BaseModel):
    name: company_schema.FieldName
    email: company_schema.FieldEmail
    phone: company_schema.FieldPhone


class CompanyResponse(company_schema.CompanyResponse):
    pass


class CompanyItemResponse(auth_schema.AuthResponse):
    item: CompanyResponse
