from app.api.v1.page.account import (
    route as account_route,
)
from app.api.v1.page.workspace import (
    route as workspace_route,
)
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/page',
)

router.include_router(
    account_route.router,
)
router.include_router(
    workspace_route.router,
)
