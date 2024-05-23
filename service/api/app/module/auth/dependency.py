from typing import Annotated

from app.module.auth import (
    exception as auth_exception,
    jwt as auth_jwt,
    oauth2 as auth_oauth2,
    schema as auth_schema,
    service as auth_service,
)
from app.module.db import (
    dependency as db_dependency,
)
from app.module.user import (
    model as user_model,
)
from fastapi.param_functions import Security
from fastapi.responses import Response
from sqlalchemy.ext.asyncio.session import AsyncSession


def __get_access_token_sub(access_token: str) -> str:
    sub: str = auth_jwt.get_access_token_sub(access_token=access_token)
    return sub


async def __get_user_orm(db_async_session: AsyncSession, sub: str) -> user_model.User:
    user_orm = await auth_service.get_user_by_id(db_async_session, sub)
    if user_orm is None:
        raise auth_exception.Http401CouldNotValidateUserCredentials
    if not user_orm.is_active:
        raise auth_exception.Http401UserInactive
    if user_orm.company_id is None and not user_orm.has_permission_of_root:
        raise auth_exception.Http401UserMustBelongToACompany
    return user_orm


def __create_access_token_new(sub: str) -> str:
    access_token_new = auth_jwt.create_access_token(sub=sub)
    return access_token_new


def ___update_response_header_authorization(response: Response, access_token_new: str) -> None:
    response.headers['Authorization'] = 'Bearer {access_token_new}'.format(access_token_new=access_token_new)
    return None


def __create_auth_response(user_orm: user_model.User, access_token_new: str) -> auth_schema.AuthResponse:
    auth_response = auth_schema.AuthResponse(
        auth=auth_schema.AuthAccessTokenAndUserResponse(
            access_token=access_token_new,
            user=auth_schema.AuthUserResponse(**dict(user_orm.__dict__)),
        ),
    )
    return auth_response


async def __get_auth_requiere_user(response: Response, access_token: Annotated[str, Security(dependency=auth_oauth2.get_oauth2_password_bearer_scheme())], db_async_session: db_dependency.DependDBAsyncSession) -> auth_schema.AuthResponse:
    sub = __get_access_token_sub(access_token=access_token)
    user_orm = await __get_user_orm(db_async_session=db_async_session, sub=sub)
    access_token_new = __create_access_token_new(sub=sub)
    ___update_response_header_authorization(response=response, access_token_new=access_token_new)
    auth_response = __create_auth_response(user_orm=user_orm, access_token_new=access_token_new)
    return auth_response


async def __get_auth_requiere_user_has_permission_of_root(response: Response, access_token: Annotated[str, Security(dependency=auth_oauth2.get_oauth2_password_bearer_scheme())], db_async_session: db_dependency.DependDBAsyncSession) -> auth_schema.AuthResponse:
    sub = __get_access_token_sub(access_token=access_token)
    user_orm = await __get_user_orm(db_async_session=db_async_session, sub=sub)
    if not user_orm.has_permission_of_root:
        raise auth_exception.Http403UserHasNotPermissionOfRoot
    access_token_new = __create_access_token_new(sub=sub)
    ___update_response_header_authorization(response=response, access_token_new=access_token_new)
    auth_response = __create_auth_response(user_orm=user_orm, access_token_new=access_token_new)
    return auth_response


async def __get_auth_requiere_user_has_permission_of_admin(response: Response, access_token: Annotated[str, Security(dependency=auth_oauth2.get_oauth2_password_bearer_scheme())], db_async_session: db_dependency.DependDBAsyncSession) -> auth_schema.AuthResponse:
    sub = __get_access_token_sub(access_token=access_token)
    user_orm = await __get_user_orm(db_async_session=db_async_session, sub=sub)
    if not user_orm.has_permission_of_admin:
        raise auth_exception.Http403UserHasNotPermissionOfAdmin
    access_token_new = __create_access_token_new(sub=sub)
    ___update_response_header_authorization(response=response, access_token_new=access_token_new)
    auth_response = __create_auth_response(user_orm=user_orm, access_token_new=access_token_new)
    return auth_response


async def __get_auth_requiere_user_has_permission_of_sale(response: Response, access_token: Annotated[str, Security(dependency=auth_oauth2.get_oauth2_password_bearer_scheme())], db_async_session: db_dependency.DependDBAsyncSession) -> auth_schema.AuthResponse:
    sub = __get_access_token_sub(access_token=access_token)
    user_orm = await __get_user_orm(db_async_session=db_async_session, sub=sub)
    if not user_orm.has_permission_of_sale:
        raise auth_exception.Http403UserHasNotPermissionOfSale
    access_token_new = __create_access_token_new(sub=sub)
    ___update_response_header_authorization(response=response, access_token_new=access_token_new)
    auth_response = __create_auth_response(user_orm=user_orm, access_token_new=access_token_new)
    return auth_response


async def __get_auth_requiere_user_has_permission_of_project(response: Response, access_token: Annotated[str, Security(dependency=auth_oauth2.get_oauth2_password_bearer_scheme())], db_async_session: db_dependency.DependDBAsyncSession) -> auth_schema.AuthResponse:
    sub = __get_access_token_sub(access_token=access_token)
    user_orm = await __get_user_orm(db_async_session=db_async_session, sub=sub)
    if not user_orm.has_permission_of_project:
        raise auth_exception.Http403UserHasNotPermissionOfProject
    access_token_new = __create_access_token_new(sub=sub)
    ___update_response_header_authorization(response=response, access_token_new=access_token_new)
    auth_response = __create_auth_response(user_orm=user_orm, access_token_new=access_token_new)
    return auth_response


DependAuth = Annotated[auth_schema.AuthResponse, Security(dependency=__get_auth_requiere_user)]
DependAuthRoot = Annotated[auth_schema.AuthResponse, Security(dependency=__get_auth_requiere_user_has_permission_of_root)]
DependAuthAdmin = Annotated[auth_schema.AuthResponse, Security(dependency=__get_auth_requiere_user_has_permission_of_admin)]
DependAuthSale = Annotated[auth_schema.AuthResponse, Security(dependency=__get_auth_requiere_user_has_permission_of_sale)]
DependAuthProject = Annotated[auth_schema.AuthResponse, Security(dependency=__get_auth_requiere_user_has_permission_of_project)]
