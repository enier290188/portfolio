from fastapi.routing import APIRouter

from app.api.v1.sync.account import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
    exception as auth_exception,
)

router = APIRouter(
    prefix='/account',
    tags=['api.v1.sync.account'],
)


@router.post(path='/sync/', response_model=api_schema.SyncResponse)
async def sync(request: api_schema.SyncRequest, auth_response: auth_dependency.DependAuth):
    data = dict(**request.model_dump())
    data_id: str = data.get('id', '')
    auth_user_id: str = auth_response.auth.user.id
    if auth_user_id != data_id:
        raise auth_exception.Http403UserNotAllowed

    return api_schema.SyncResponse(
        **dict(auth_response)
    )
