from typing import Sequence

from app.module.deal import (
    model as deal_model,
)
from pydantic.types import UUID4
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.sql import delete as _delete, insert as _insert, select as _select, update as _update


async def fetch(db_async_session: AsyncSession, limit: int = 0, offset: int = 0) -> Sequence[deal_model.Deal]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(deal_model.Deal).order_by(deal_model.Deal.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def fetch_by_company_id(db_async_session: AsyncSession, company_id: UUID4, limit: int = 0, offset: int = 0) -> Sequence[deal_model.Deal]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(deal_model.Deal).where(deal_model.Deal.company_id == company_id).order_by(deal_model.Deal.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def create(db_async_session: AsyncSession, data: dict) -> deal_model.Deal | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _insert(deal_model.Deal).values(**data).returning(deal_model.Deal)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()


async def get_by_id(db_async_session: AsyncSession, id: UUID4) -> deal_model.Deal | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(deal_model.Deal).where(deal_model.Deal.id == id)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalar_one_or_none()


async def update(db_async_session: AsyncSession, id: UUID4, data: dict) -> deal_model.Deal | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _update(deal_model.Deal).where(deal_model.Deal.id == id).values(**data).returning(deal_model.Deal)
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
            query = _delete(deal_model.Deal).where(deal_model.Deal.id == id).returning(deal_model.Deal)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()
