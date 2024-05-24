from typing import Annotated

from fastapi import status
from fastapi.param_functions import Depends
from fastapi.responses import Response
from fastapi.routing import APIRouter
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from app.api.v1.page.account import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
    exception as auth_exception,
    jwt as auth_jwt,
    service as auth_service,
)
from app.module.db import (
    dependency as db_dependency,
)

router = APIRouter(
    prefix='/account',
    tags=['api.v1.page.account'],
)


@router.post(path='/login/', status_code=status.HTTP_200_OK, response_model=api_schema.LoginResponse)
async def login(response: Response, request: Annotated[OAuth2PasswordRequestForm, Depends()], db_async_session: db_dependency.DependDBAsyncSession):
    username: str = request.username
    password: str = request.password

    user_orm = await auth_service.get_user_by_email(db_async_session, username)
    if user_orm is None:
        raise auth_exception.Http401IncorrectUsernameOrPassword
    if not auth_service.verify_user_password_plain(password, user_orm.password):
        raise auth_exception.Http401IncorrectUsernameOrPassword
    if not user_orm.is_active:
        raise auth_exception.Http401UserInactive
    if user_orm.has_permission_of_root is False and user_orm.has_permission_of_admin is False and user_orm.has_permission_of_sale is False and user_orm.has_permission_of_project is False:
        raise auth_exception.Http401UserMustBelongToAGroup
    if user_orm.company_id is None and not user_orm.has_permission_of_root:
        raise auth_exception.Http401UserMustBelongToACompany

    sub: str = str(user_orm.id)

    access_token = auth_jwt.create_access_token(sub=sub)
    response.headers['Authorization'] = 'Bearer {access_token}'.format(access_token=access_token)

    return api_schema.LoginResponse(
        access_token=access_token,
    )


@router.post(path='/login-sync/', response_model=api_schema.LoginSyncResponse)
async def login_sync(auth_response: auth_dependency.DependAuth):
    return api_schema.LoginSyncResponse(
        **dict(auth_response)
    )


@router.post(path='/profile/', response_model=api_schema.ProfileItemResponse)
async def profile_get(request: api_schema.ProfileRequest, auth_response: auth_dependency.DependAuth, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())
    data_id: str = data.get('id', '')

    auth_user_id: str = auth_response.auth.user.id

    if auth_user_id != data_id:
        raise auth_exception.Http403UserNotAllowed

    user_orm = await auth_service.get_user_by_id(db_async_session, auth_user_id)
    if user_orm is None:
        raise auth_exception.Http404UserNotFound

    return api_schema.ProfileItemResponse(
        **dict(auth_response),
        item=api_schema.ProfileResponse(**dict(user_orm.__dict__)),
    )


@router.patch(path='/profile/info/', response_model=api_schema.ProfileItemResponse)
async def profile_info_update(request: api_schema.ProfileRequest, auth_response: auth_dependency.DependAuth, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())
    data_id: str = data.get('id', '')

    auth_user_id: str = auth_response.auth.user.id

    if auth_user_id != data_id:
        raise auth_exception.Http403UserNotAllowed

    user_orm = await auth_service.get_user_by_id(db_async_session, auth_user_id)
    if user_orm is None:
        raise auth_exception.Http404UserNotFound

    return api_schema.ProfileItemResponse(
        **dict(auth_response),
        item=api_schema.ProfileResponse(**dict(user_orm.__dict__)),
    )


@router.patch(path='/profile/password/', response_model=api_schema.ProfileItemResponse)
async def profile_password_update(request: api_schema.ProfileRequest, auth_response: auth_dependency.DependAuth, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())
    data_id: str = data.get('id', '')

    auth_user_id: str = auth_response.auth.user.id

    if auth_user_id != data_id:
        raise auth_exception.Http403UserNotAllowed

    user_orm = await auth_service.get_user_by_id(db_async_session, auth_user_id)
    if user_orm is None:
        raise auth_exception.Http404UserNotFound

    return api_schema.ProfileItemResponse(
        **dict(auth_response),
        item=api_schema.ProfileResponse(**dict(user_orm.__dict__)),
    )
