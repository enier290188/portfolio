from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import Boolean, String

from app.module.db import (
    model as db_model,
)


class Company(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'company'

    name: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        index=True,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean(),
        nullable=False,
        default=True,
        index=True,
    )
