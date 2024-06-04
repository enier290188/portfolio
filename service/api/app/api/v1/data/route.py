from app.api.v1.data import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
    exception as auth_exception,
)
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/data',
    tags=['api.v1.data'],
)


@router.post(path='/init/', response_model=None)
async def init(request: api_schema.InitRequest, auth_response: auth_dependency.DependAuthRoot):
    data = dict(**request.model_dump())
    data_id: str = data.get('id', '')
    auth_user_id: str = auth_response.auth.user.id
    if auth_user_id != data_id:
        raise auth_exception.Http403UserNotAllowed

    return None
