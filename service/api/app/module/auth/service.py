from app.module.user import (
    hashing as user_hashing,
    model as user_model,
    service as user_service,
)
from pydantic.networks import EmailStr
from pydantic.types import UUID4
from sqlalchemy.ext.asyncio.session import AsyncSession


async def get_user_by_id(db_async_session: AsyncSession, id: UUID4) -> user_model.User | None:
    try:
        user_orm = await user_service.get_by_id(db_async_session, id)
    except (Exception,) as _:
        return None
    else:
        return user_orm


async def get_user_by_email(db_async_session: AsyncSession, email: EmailStr) -> user_model.User | None:
    try:
        user_orm = await user_service.get_by_email(db_async_session, email)
    except (Exception,) as _:
        return None
    else:
        return user_orm


def verify_user_password_plain(password_plain: str, password_hash: str) -> bool:
    return user_hashing.verify_password_plain(password_plain, password_hash)
