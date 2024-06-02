from typing import Annotated

from app.api.v1.page.workspace.sale.company import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
    exception as auth_exception,
)
from app.module.company import (
    exception as company_exception,
    service as company_service,
)
from app.module.db import (
    dependency as db_dependency,
)
from fastapi import status
from fastapi.param_functions import Path
from fastapi.routing import APIRouter
from pydantic.types import UUID4

router = APIRouter(
    prefix='/company',
)


@router.get(path='/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.CompanyItemResponse)
async def get(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthSale, db_async_session: db_dependency.DependDBAsyncSession):
    company_orm = await company_service.get_by_id(db_async_session, id)
    if company_orm is None:
        raise company_exception.Http404

    if auth_response.auth.user.company_id != id:
        raise auth_exception.Http403UserNotAllowed

    return api_schema.CompanyItemResponse(
        **dict(auth_response),
        item=api_schema.CompanyResponse(**dict(company_orm.__dict__)),
    )
