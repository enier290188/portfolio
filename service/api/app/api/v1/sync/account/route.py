from fastapi.routing import APIRouter

from app.api.v1.sync.account import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
)

router = APIRouter(
    prefix='/account',
    tags=['api.v1.sync.account'],
)


@router.post(path='/sync/', response_model=api_schema.SyncResponse)
async def sync(auth_response: auth_dependency.DependAuth):
    return api_schema.SyncResponse(
        **dict(auth_response)
    )
