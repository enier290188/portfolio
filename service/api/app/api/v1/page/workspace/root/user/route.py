from typing import Annotated

from app.api.v1.page.workspace.root.user import (
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
    prefix='/user',
)


@router.get(path='/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemsResponse)
async def fetch(auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession, limit: Annotated[int, Query(ge=0)] = 0, offset: Annotated[int, Query(ge=0)] = 0):
    users_orm = await user_service.fetch(db_async_session, limit, offset)

    return api_schema.UserItemsResponse(
        **dict(auth_response),
        items=[api_schema.UserResponse(**dict(user_orm.__dict__)) for user_orm in users_orm],
    )


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=api_schema.UserItemResponse)
async def create(request: api_schema.UserRequestCreate, auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())

    data_email: str = data.get('email', '')
    user_orm = await user_service.get_by_email(db_async_session, data_email)
    if user_orm is not None:
        raise user_exception.Http409EmailAlreadyExists

    data_company_id: str = data.get('company_id', '')
    company_orm = await company_service.get_by_id(db_async_session, data_company_id)
    if company_orm is None:
        raise company_exception.Http404

    user_orm = await user_service.create(db_async_session, data)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )


@router.get(path='/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def get(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    user_orm = await user_service.get_by_id(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )


@router.patch('/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def update(id: Annotated[UUID4, Path()], request: api_schema.UserRequestUpdate, auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())

    user_orm = await user_service.get_by_id(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    if auth_response.auth.user.id == id:
        data_is_active: bool = data.get('is_active', False)
        if not data_is_active:
            raise auth_exception.Http403UserNotAllowedToUpdateAttribute

    data_company_id: str = data.get('company_id', '')
    company_orm = await company_service.get_by_id(db_async_session, data_company_id)
    if company_orm is None:
        raise company_exception.Http404

    user_orm = await user_service.update(db_async_session, id, data)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )


@router.delete('/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def remove(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    user_orm = await user_service.get_by_id(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    if auth_response.auth.user.id == id:
        raise auth_exception.Http403UserNotAllowed

    user_orm = await user_service.remove(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )
