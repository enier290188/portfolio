from app.module.auth import (
    schema as auth_schema,
)
from app.module.user import (
    schema as user_schema,
)


class UserResponse(user_schema.UserResponse):
    pass


class UserItemResponse(auth_schema.AuthResponse):
    item: UserResponse
