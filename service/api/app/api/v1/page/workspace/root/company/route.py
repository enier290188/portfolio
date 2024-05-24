from typing import Annotated

from app.api.v1.workspace.root.company import (
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
from app.module.user import (
    exception as user_exception,
    service as user_service,
)
from fastapi import status
from fastapi.param_functions import Path, Query
from fastapi.routing import APIRouter
from pydantic.types import UUID4

router = APIRouter(
    prefix='/company',
)


@router.get(path='/', status_code=status.HTTP_200_OK, response_model=api_schema.CompanyItemsResponse)
async def fetch(auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession, limit: Annotated[int, Query(ge=0)] = 0, offset: Annotated[int, Query(ge=0)] = 0):
    companies_orm = await company_service.fetch(db_async_session, limit, offset)

    return api_schema.CompanyItemsResponse(
        **dict(auth_response),
        items=[api_schema.CompanyResponse(**dict(company_orm.__dict__)) for company_orm in companies_orm],
    )


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=api_schema.CompanyItemResponse)
async def create(request: api_schema.CompanyRequestCreate, auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())

    company_orm = await company_service.create(db_async_session, data)
    if company_orm is None:
        raise company_exception.Http404

    return api_schema.CompanyItemResponse(
        **dict(auth_response),
        item=api_schema.CompanyResponse(**dict(company_orm.__dict__)),
    )


@router.get(path='/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.CompanyItemResponse)
async def get(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    company_orm = await company_service.get_by_id(db_async_session, id)
    if company_orm is None:
        raise company_exception.Http404

    return api_schema.CompanyItemResponse(
        **dict(auth_response),
        item=api_schema.CompanyResponse(**dict(company_orm.__dict__)),
    )


@router.patch('/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.CompanyItemResponse)
async def update(id: Annotated[UUID4, Path()], request: api_schema.CompanyRequestUpdate, auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())

    company_orm = await company_service.get_by_id(db_async_session, id)
    if company_orm is None:
        raise company_exception.Http404

    if auth_response.auth.user.company_id == id:
        data_is_active: bool = data.get('is_active', False)
        if not data_is_active:
            raise auth_exception.Http403UserNotAllowedToUpdateAttribute

    company_orm = await company_service.update(db_async_session, id, data)
    if company_orm is None:
        raise company_exception.Http404

    return api_schema.CompanyItemResponse(
        **dict(auth_response),
        item=api_schema.CompanyResponse(**dict(company_orm.__dict__)),
    )


@router.delete('/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.CompanyItemResponse)
async def remove(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    company_orm = await company_service.get_by_id(db_async_session, id)
    if company_orm is None:
        raise company_exception.Http404

    if auth_response.auth.user.company_id == id:
        raise auth_exception.Http403UserNotAllowed

    users_by_company_id_orm = await user_service.fetch_by_company_id(db_async_session, id)
    for user_by_company_id_orm in users_by_company_id_orm:
        user_orm = await user_service.remove(db_async_session, user_by_company_id_orm.id)
        if user_orm is None:
            raise user_exception.Http404

    company_orm = await company_service.remove(db_async_session, id)
    if company_orm is None:
        raise company_exception.Http404

    return api_schema.CompanyItemResponse(
        **dict(auth_response),
        item=api_schema.CompanyResponse(**dict(company_orm.__dict__)),
    )
