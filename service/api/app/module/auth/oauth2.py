from typing import Optional

from app.module.auth import (
    exception as auth_exception,
)
from fastapi.requests import Request
from fastapi.security.oauth2 import OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param


class __OAuth2PasswordBearerScheme(OAuth2PasswordBearer):
    async def __call__(self, request: Request) -> Optional[str]:
        authorization: str = request.headers.get('Authorization')
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != 'bearer':
            if self.auto_error:
                raise auth_exception.Http401CouldNotValidateUserCredentials
            else:
                return None
        return param


__oauth2_password_bearer_scheme: __OAuth2PasswordBearerScheme = __OAuth2PasswordBearerScheme(tokenUrl='/api/v1/page/account/login/')


def get_oauth2_password_bearer_scheme() -> __OAuth2PasswordBearerScheme:
    return __oauth2_password_bearer_scheme
