from typing import Sequence

from app.module.company import (
    model as company_model,
)
from app.module.deal import (
    model as deal_model,
)
from app.module.lead import (
    model as lead_model,
)
from app.module.user import (
    model as user_model,
)
from pydantic.types import UUID4
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.sql import delete as _delete, insert as _insert, select as _select, update as _update


async def fetch(db_async_session: AsyncSession, limit: int = 0, offset: int = 0) -> Sequence[company_model.Company]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(company_model.Company).order_by(company_model.Company.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def create(db_async_session: AsyncSession, data: dict) -> company_model.Company | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _insert(company_model.Company).values(**data).returning(company_model.Company)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()


async def get_by_id(db_async_session: AsyncSession, id: UUID4) -> company_model.Company | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(company_model.Company).where(company_model.Company.id == id)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalar_one_or_none()


async def update(db_async_session: AsyncSession, id: UUID4, data: dict) -> company_model.Company | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _update(company_model.Company).where(company_model.Company.id == id).values(**data).returning(company_model.Company)
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
            query = _delete(deal_model.Deal).where(deal_model.Deal.company_id == id)
            await db_async_session.execute(query)

            query = _delete(lead_model.Lead).where(lead_model.Lead.company_id == id)
            await db_async_session.execute(query)

            query = _delete(user_model.User).where(user_model.User.company_id == id)
            await db_async_session.execute(query)

            query = _delete(company_model.Company).where(company_model.Company.id == id).returning(company_model.Company)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()
