from functools import lru_cache
from typing import Sequence

from pydantic.fields import computed_field, Field
from pydantic.networks import PostgresDsn
from pydantic_core import MultiHostUrl
from pydantic_settings.main import BaseSettings, SettingsConfigDict


class __Setting(BaseSettings):
    model_config = SettingsConfigDict(
        env_file_encoding='utf-8',
        env_file=None,
        secrets_dir='/run/secrets',
    )

    # service-api
    SERVICE_API_TITLE: str = Field(default='FastAPI')
    SERVICE_API_VERSION: str = Field(default='0.1.0')
    SERVICE_API_DOCS_URL: str | None = Field(default='/')
    SERVICE_API_REDOC_URL: str | None = Field(default=None)
    SERVICE_API_OPENAPI_URL: str | None = Field(default='/openapi.json')
    SERVICE_API_MIDDLEWARE_CORS_ALLOW_ORIGINS: Sequence[str] = Field(default=['*'])
    SERVICE_API_MIDDLEWARE_CORS_ALLOW_METHODS: Sequence[str] = Field(default=['GET', 'POST', 'PATCH', 'DELETE'])
    SERVICE_API_MIDDLEWARE_CORS_ALLOW_HEADERS: Sequence[str] = Field(default=['Content-Type', 'Authorization'])
    SERVICE_API_MIDDLEWARE_CORS_ALLOW_CREDENTIALS: bool = Field(default=False)
    SERVICE_API_MIDDLEWARE_CORS_ALLOW_ORIGIN_REGEX: str | None = Field(default=None)
    SERVICE_API_MIDDLEWARE_CORS_EXPOSE_HEADERS: Sequence[str] = Field(default=[])
    SERVICE_API_MIDDLEWARE_CORS_MAX_AGE: int = Field(default=600)
    SERVICE_API_MIDDLEWARE_TRUSTEDHOST_ALLOWED_HOSTS: Sequence[str] | None = Field(default=['*'])
    SERVICE_API_MIDDLEWARE_TRUSTEDHOST_ALLOWED_WWW_REDIRECT: bool = Field(default=True)

    # service-api-auth
    SERVICE_API_AUTH_JWT_KEY_FILE: str = Field(default='')  # to get a string like this run: openssl rand -hex 32
    SERVICE_API_AUTH_JWT_ALGORITHM_FILE: str = Field(default='')
    SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=0)

    # service-api-user
    SERVICE_API_USER_ROOT_EMAIL: str = Field(default='')
    SERVICE_API_USER_ROOT_PASSWORD_FILE: str = Field(default='')

    # service-db
    SERVICE_DB_HOST: str = Field(default='')
    SERVICE_DB_PORT: str = Field(default='')
    SERVICE_DB_DATABASE: str = Field(default='')
    SERVICE_DB_USER: str = Field(default='')
    SERVICE_DB_PASSWORD_FILE: str = Field(default='')

    # sqlalchemy
    # noinspection PyPep8Naming
    @computed_field
    @property
    def SERVICE_API_SQLALCHEMY_DATABASE_URL(self) -> str:
        url: MultiHostUrl = PostgresDsn.build(
            scheme='postgresql+psycopg',
            host=str(self.SERVICE_DB_HOST),
            port=int(self.SERVICE_DB_PORT),
            path=str(self.SERVICE_DB_DATABASE),
            username=str(self.SERVICE_DB_USER),
            password=str(self.SERVICE_DB_PASSWORD_FILE),
        )
        return url.unicode_string()


__setting: __Setting = __Setting()


@lru_cache()
def get_setting() -> __Setting:
    return __setting
