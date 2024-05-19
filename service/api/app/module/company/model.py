from app.module.db import (
    model as db_model,
)
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import Boolean, String


class Company(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'company'

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
    logo: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        default='',
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
        default=False,
        index=True,
    )
