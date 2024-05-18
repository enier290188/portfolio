from sqlalchemy.sql import insert as _insert, select as _select

from app.config import (
    setting,
)
from app.module.db import (
    dependency as db_dependency,
)
from app.module.user import (
    hashing as user_hashing,
    model as user_model,
)

__setting = setting.get_setting()


async def on_startup() -> None:
    db_async_session = await db_dependency.get_async_session()
    async with db_async_session:
        await db_async_session.begin()
        try:
            result = await db_async_session.execute(_select(user_model.User).where(user_model.User.email == __setting.SERVICE_API_USER_ROOT_EMAIL))
            if result.scalar_one_or_none() is None:
                data = {
                    'name': __setting.SERVICE_API_USER_ROOT_EMAIL,
                    'email': __setting.SERVICE_API_USER_ROOT_EMAIL,
                    'password': user_hashing.get_password_hash(password_plain=__setting.SERVICE_API_USER_ROOT_PASSWORD_FILE),
                    'is_active': True,
                    'has_permission_of_root': True,
                    'has_permission_of_admin': False,
                    'has_permission_of_sale': False,
                    'has_permission_of_project': False,
                    'company_id': None,
                }
                await db_async_session.execute(_insert(user_model.User).values(**data).returning(user_model.User))
        except Exception as _:
            await db_async_session.rollback()
            raise
        else:
            await db_async_session.commit()
