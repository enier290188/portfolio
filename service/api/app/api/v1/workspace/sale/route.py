from fastapi.routing import APIRouter

from app.api.v1.workspace.sale.company import (
    route as company_route,
)
from app.api.v1.workspace.sale.user import (
    route as user_route,
)

router = APIRouter(
    prefix='/sale',
    tags=['api.v1.workspace.sale'],
)

router.include_router(
    company_route.router,
)
router.include_router(
    user_route.router,
)
