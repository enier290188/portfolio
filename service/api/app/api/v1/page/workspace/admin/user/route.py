from typing import Annotated

from fastapi import status
from fastapi.param_functions import Path
from fastapi.routing import APIRouter
from pydantic.types import UUID4

from app.api.v1.page.workspace.admin.user import (
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


@router.get(path='/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemsResponse)
async def fetch(auth_response: auth_dependency.DependAuthAdmin, db_async_session: db_dependency.DependDBAsyncSession):
    users_orm = await user_service.fetch_by_company_id(db_async_session, auth_response.auth.user.company_id)

    return api_schema.UserItemsResponse(
        **dict(auth_response),
        items=[api_schema.UserResponse(**dict(user_orm.__dict__)) for user_orm in users_orm],
    )


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=api_schema.UserItemResponse)
async def create(request: api_schema.UserRequestCreate, auth_response: auth_dependency.DependAuthAdmin, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())

    data_email: str = data.get('email', '')
    user_orm = await user_service.get_by_email(db_async_session, data_email)
    if user_orm is not None:
        raise user_exception.Http409EmailAlreadyExists

    data['company_id'] = auth_response.auth.user.company_id

    user_orm = await user_service.create(db_async_session, data)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )


@router.get(path='/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def get(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthAdmin, db_async_session: db_dependency.DependDBAsyncSession):
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


@router.patch('/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def update(id: Annotated[UUID4, Path()], request: api_schema.UserRequestUpdate, auth_response: auth_dependency.DependAuthAdmin, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())

    user_orm = await user_service.get_by_id(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    data_company_id: str = auth_response.auth.user.company_id
    if data_company_id != user_orm.company_id:
        raise auth_exception.Http403UserNotAllowed

    if auth_response.auth.user.id == id:
        data_is_active: bool = data.get('is_active', False)
        if not data_is_active:
            raise auth_exception.Http403UserNotAllowedToUpdateAttribute
        has_permission_of_admin: bool = data.get('has_permission_of_admin', False)
        if not has_permission_of_admin:
            raise auth_exception.Http403UserNotAllowedToUpdateAttribute

    user_orm = await user_service.update(db_async_session, id, data)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )


@router.delete('/{id}/', status_code=status.HTTP_200_OK, response_model=api_schema.UserItemResponse)
async def remove(id: Annotated[UUID4, Path()], auth_response: auth_dependency.DependAuthAdmin, db_async_session: db_dependency.DependDBAsyncSession):
    user_orm = await user_service.get_by_id(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    data_company_id: str = auth_response.auth.user.company_id
    if data_company_id != user_orm.company_id:
        raise auth_exception.Http403UserNotAllowed

    if auth_response.auth.user.id == id:
        raise auth_exception.Http403UserNotAllowed

    user_orm = await user_service.remove(db_async_session, id)
    if user_orm is None:
        raise user_exception.Http404

    return api_schema.UserItemResponse(
        **dict(auth_response),
        item=api_schema.UserResponse(**dict(user_orm.__dict__)),
    )
