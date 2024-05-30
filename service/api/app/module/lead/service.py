from typing import Sequence

from app.module.lead import (
    model as lead_model,
)
from pydantic.types import UUID4
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.sql import delete as _delete, insert as _insert, select as _select, update as _update


async def fetch(db_async_session: AsyncSession, limit: int = 0, offset: int = 0) -> Sequence[lead_model.Lead]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(lead_model.Lead).order_by(lead_model.Lead.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def fetch_by_company_id(db_async_session: AsyncSession, company_id: UUID4, limit: int = 0, offset: int = 0) -> Sequence[lead_model.Lead]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(lead_model.Lead).where(lead_model.Lead.company_id == company_id).order_by(lead_model.Lead.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def fetch_by_user_sale_id(db_async_session: AsyncSession, user_sale_id: UUID4, limit: int = 0, offset: int = 0) -> Sequence[lead_model.Lead]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(lead_model.Lead).where(lead_model.Lead.user_sale_id == user_sale_id).order_by(lead_model.Lead.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def fetch_by_user_project_id(db_async_session: AsyncSession, user_project_id: UUID4, limit: int = 0, offset: int = 0) -> Sequence[lead_model.Lead]:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(lead_model.Lead).where(lead_model.Lead.user_project_id == user_project_id).order_by(lead_model.Lead.name.asc())
            if 0 < limit:
                query = query.limit(limit).offset(offset)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalars().all()


async def create(db_async_session: AsyncSession, data: dict) -> lead_model.Lead | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _insert(lead_model.Lead).values(**data).returning(lead_model.Lead)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()


async def get_by_id(db_async_session: AsyncSession, id: UUID4) -> lead_model.Lead | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _select(lead_model.Lead).where(lead_model.Lead.id == id)
            result = await db_async_session.execute(query)
        except Exception as _:
            raise
        else:
            return result.scalar_one_or_none()


async def update(db_async_session: AsyncSession, id: UUID4, data: dict) -> lead_model.Lead | None:
    async with db_async_session:
        await db_async_session.begin()
        try:
            query = _update(lead_model.Lead).where(lead_model.Lead.id == id).values(**data).returning(lead_model.Lead)
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
            query = _delete(lead_model.Lead).where(lead_model.Lead.id == id).returning(lead_model.Lead)
            result = await db_async_session.execute(query)
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
            return result.scalar_one_or_none()
