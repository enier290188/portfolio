from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import String, UUID

from app.module.db import (
    model as db_model,
)


class Deal(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'deal'

    name: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default='',
        index=True,
    )
    email: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        default='',
        index=True,
    )
    phone: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        default='',
        index=True,
    )

    company_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
        default=None,
        index=True,
    )
