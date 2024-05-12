from app.module.db import (
    model as db_model,
)
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.base import Mapped
from sqlalchemy.sql.sqltypes import String


class Comment(db_model.SQLAlchemyDeclarativeBase):
    __tablename__ = 'comment'

    text: Mapped[str] = mapped_column(
        String(1024),
        nullable=False,
        index=True,
    )
