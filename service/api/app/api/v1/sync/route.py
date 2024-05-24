from fastapi.routing import APIRouter

from app.api.v1.page.account import (
    route as account_route,
)
from app.api.v1.page.workspace import (
    route as workspace_route,
)

router = APIRouter(
    prefix='/v1',
)

router.include_router(
    account_route.router,
)
router.include_router(
    workspace_route.router,
)
