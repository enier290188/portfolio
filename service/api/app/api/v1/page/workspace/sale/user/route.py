from typing import Annotated

from fastapi import status
from fastapi.param_functions import Path
from fastapi.routing import APIRouter
from pydantic.types import UUID4

from app.api.v1.page.workspace.sale.user import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
    exception as auth_exception,
)
from app.module.db import (
    dependency as db_dependency,
)
from app.module.user import (
    exception as user_exception,
    service as user_service,
)

router = APIRouter(
    prefix='/user',
)


@router.get(path='/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def get(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthSale, db_async_session: db_dependency.DependDBAsyncSession):
    user_orm = await user_service.get_by_id(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    data_company_id: str = auth_response.auth.user.company_id
    if data_company_id != user_orm.company_id:
        raise auth_exception.Http403UserNotAllowed

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )
