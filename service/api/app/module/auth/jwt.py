from datetime import datetime, timedelta, timezone

from app.config import (
    setting,
)
from app.module.auth import (
    exception as auth_exception,
)
from jose import jwt
from jose.exceptions import JWTError

__setting = setting.get_setting()


def create_access_token(sub: str) -> str:
    exp = datetime.now(timezone.utc) + timedelta(minutes=__setting.SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES)
    claims: dict = {
        'sub': sub,
        'exp': exp,
    }
    access_token = jwt.encode(
        claims=claims,
        key=__setting.SERVICE_API_AUTH_JWT_KEY_FILE,
        algorithm=__setting.SERVICE_API_AUTH_JWT_ALGORITHM_FILE,
    )
    return access_token


def get_access_token_sub(access_token: str) -> str:
    try:
        payload = jwt.decode(
            token=access_token,
            key=__setting.SERVICE_API_AUTH_JWT_KEY_FILE,
            algorithms=[__setting.SERVICE_API_AUTH_JWT_ALGORITHM_FILE],
        )
        sub: str = payload.get('sub')
        if sub is None:
            raise JWTError()
        return sub
    except JWTError as _:
        raise auth_exception.Http401CouldNotValidateUserCredentials
