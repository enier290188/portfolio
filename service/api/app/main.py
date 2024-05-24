from fastapi.applications import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api import (
    route as api_route,
)
from app.config import (
    setting,
)
from app.module.db import (
    service as db_service,
)

__setting = setting.get_setting()


async def __on_startup():
    await db_service.on_startup()


app: FastAPI = FastAPI(
    title=__setting.SERVICE_API_TITLE,
    version=__setting.SERVICE_API_VERSION,
    docs_url=__setting.SERVICE_API_DOCS_URL,
    redoc_url=__setting.SERVICE_API_REDOC_URL,
    openapi_url=__setting.SERVICE_API_OPENAPI_URL,
    swagger_ui_parameters={
        'docExpansion': 'none',
    },
    on_startup=[
        __on_startup,
    ],
)

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=__setting.SERVICE_API_MIDDLEWARE_CORS_ALLOW_ORIGINS,
    allow_methods=__setting.SERVICE_API_MIDDLEWARE_CORS_ALLOW_METHODS,
    allow_headers=__setting.SERVICE_API_MIDDLEWARE_CORS_ALLOW_HEADERS,
    allow_credentials=__setting.SERVICE_API_MIDDLEWARE_CORS_ALLOW_CREDENTIALS,
    allow_origin_regex=__setting.SERVICE_API_MIDDLEWARE_CORS_ALLOW_ORIGIN_REGEX,
    expose_headers=__setting.SERVICE_API_MIDDLEWARE_CORS_EXPOSE_HEADERS,
    max_age=__setting.SERVICE_API_MIDDLEWARE_CORS_MAX_AGE,
)
app.add_middleware(
    middleware_class=TrustedHostMiddleware,
    allowed_hosts=__setting.SERVICE_API_MIDDLEWARE_TRUSTEDHOST_ALLOWED_HOSTS,
    www_redirect=__setting.SERVICE_API_MIDDLEWARE_TRUSTEDHOST_ALLOWED_WWW_REDIRECT,
)

app.include_router(
    router=api_route.router,
)
