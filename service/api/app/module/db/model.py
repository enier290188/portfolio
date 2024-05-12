from datetime import datetime
from uuid import uuid4

from sqlalchemy.ext.asyncio.session import AsyncAttrs
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.orm.decl_api import DeclarativeBase
from sqlalchemy.sql.functions import func
from sqlalchemy.sql.sqltypes import DateTime, UUID


class SQLAlchemyDeclarativeBase(AsyncAttrs, DeclarativeBase):
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=func.now(),
        index=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        index=True,
    )

    def __repr__(self):
        return '<{model} id={id} created_at={created_at} updated_at={updated_at}>'.format(
            model=self.__class__.__name__,
            id=self.id,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )
