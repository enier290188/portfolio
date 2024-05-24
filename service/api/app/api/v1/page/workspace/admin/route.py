from fastapi.routing import APIRouter

from app.api.v1.page.workspace.admin.company import (
    route as company_route,
)
from app.api.v1.page.workspace.admin.user import (
    route as user_route,
)

router = APIRouter(
    prefix='/admin',
    tags=['api.v1.page.workspace.admin'],
)

router.include_router(
    company_route.router,
)
router.include_router(
    user_route.router,
)
