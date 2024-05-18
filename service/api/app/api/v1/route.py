from fastapi.routing import APIRouter

from app.api.v1.auth import (
    route as auth_route,
)
from app.api.v1.workspace import (
    route as workspace_route,
)

router = APIRouter(
    prefix='/v1',
)

router.include_router(
    auth_route.router,
)
router.include_router(
    workspace_route.router,
)
