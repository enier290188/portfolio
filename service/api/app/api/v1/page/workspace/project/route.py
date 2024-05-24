from fastapi.routing import APIRouter

from app.api.v1.page.workspace.project.company import (
    route as company_route,
)
from app.api.v1.page.workspace.project.user import (
    route as user_route,
)

router = APIRouter(
    prefix='/project',
    tags=['api.v1.page.workspace.project'],
)

router.include_router(
    company_route.router,
)
router.include_router(
    user_route.router,
)
