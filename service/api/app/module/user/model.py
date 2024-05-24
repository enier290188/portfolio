from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import Boolean, String, UUID

from app.module.db import (
    model as db_model,
)


class User(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'user'

    name: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default='',
        index=True,
    )
    email: Mapped[str] = mapped_column(
        String(128),
        unique=True,
        nullable=False,
        index=True,
    )
    phone: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        default='',
        index=True,
    )
    picture: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        default='',
    )
    password: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        default='',
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        index=True,
    )
    has_permission_of_root: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
        default=False,
        index=True,
    )
    has_permission_of_admin: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
        default=False,
        index=True,
    )
    has_permission_of_sale: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
        default=False,
        index=True,
    )
    has_permission_of_project: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
        default=False,
        index=True,
    )

    company_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
        default=None,
        index=True,
    )
