from app.module.db import (
    model as db_model,
)
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import String


class Deal(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'deal'

    name: Mapped[str] = mapped_column(
        String(128),
        nullable=False,
        index=True,
    )
