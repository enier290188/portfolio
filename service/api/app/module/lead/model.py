from app.module.db import (
    model as db_model,
)
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import String, UUID


class Lead(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'lead'

    name: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        index=True,
    )
    email: Mapped[str] = mapped_column(
        String(128),
        nullable=True,
        default=None,
        index=True,
    )
    phone: Mapped[str] = mapped_column(
        String(128),
        nullable=True,
        default=None,
        index=True,
    )

    company_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
        default=None,
        index=True,
    )
