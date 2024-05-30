from typing import Sequence

from app.module.deal import (
    model as deal_model,
)
from app.module.lead import (
    model as lead_model,
)
from app.module.user import (
    model as user_model,
)
from pydantic.networks import EmailStr
from pydantic.types import UUID4
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.sql import delete as _delete, insert as _insert, select as _select, update as _update


async def fetch(db_async_session: AsyncSession, limit: int = 0, offset: int = 0) -> Sequence[user_model.User]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(user_model.User).order_by(user_model.User.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def fetch_by_company_id(db_async_session: AsyncSession, company_id: UUID4, limit: int = 0, offset: int = 0) -> Sequence[user_model.User]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(user_model.User).where(user_model.User.company_id == company_id).order_by(user_model.User.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def create(db_async_session: AsyncSession, data: dict) -> user_model.User | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _insert(user_model.User).values(**data).returning(user_model.User)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()


async def get_by_id(db_async_session: AsyncSession, id: UUID4) -> user_model.User | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(user_model.User).where(user_model.User.id == id)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalar_one_or_none()


async def get_by_email(db_async_session: AsyncSession, email: EmailStr) -> user_model.User | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(user_model.User).where(user_model.User.email == email)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalar_one_or_none()


async def update(db_async_session: AsyncSession, id: UUID4, data: dict) -> user_model.User | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _update(user_model.User).where(user_model.User.id == id).values(**data).returning(user_model.User)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()


async def remove(db_async_session: AsyncSession, id: UUID4) -> None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            data = {'user_sale_id': None}
            query = _update(deal_model.Deal).where(deal_model.Deal.user_sale_id == id).values(**data)
            await db_async_session.execute(query)

            data = {'user_project_id': None}
            query = _update(deal_model.Deal).where(deal_model.Deal.user_project_id == id).values(**data)
            await db_async_session.execute(query)

            data = {'user_sale_id': None}
            query = _update(lead_model.Lead).where(lead_model.Lead.user_sale_id == id).values(**data)
            await db_async_session.execute(query)

            data = {'user_project_id': None}
            query = _update(lead_model.Lead).where(lead_model.Lead.user_project_id == id).values(**data)
            await db_async_session.execute(query)

            query = _delete(user_model.User).where(user_model.User.id == id).returning(user_model.User)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()
