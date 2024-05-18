from typing import Annotated

from fastapi.param_functions import Depends
from psycopg.client_cursor import AsyncClientCursor
from sqlalchemy.ext.asyncio.engine import AsyncEngine, create_async_engine
from sqlalchemy.ext.asyncio.session import AsyncSession

from app.config import (
    setting,
)

__setting = setting.get_setting()

__async_engine: AsyncEngine = create_async_engine(
    url=__setting.SERVICE_API_SQLALCHEMY_DATABASE_URL,
    connect_args={
        'client_encoding': 'utf8',
        'cursor_factory': AsyncClientCursor,
    },
    echo=False,
)


async def get_async_session() -> AsyncSession:
    global __async_engine

    return AsyncSession(
        bind=__async_engine,
        autobegin=False,
        expire_on_commit=False,
    )


DependDBAsyncSession = Annotated[AsyncSession, Depends(dependency=get_async_session)]
