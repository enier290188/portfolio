from fastapi.routing import APIRouter

from app.api.v1.workspace.admin import (
    route as admin_route,
)
from app.api.v1.workspace.project import (
    route as project_route,
)
from app.api.v1.workspace.root import (
    route as root_route,
)
from app.api.v1.workspace.sale import (
    route as sale_route,
)

router = APIRouter(
    prefix='/workspace',
)

router.include_router(
    root_route.router,
)
router.include_router(
    admin_route.router,
)
router.include_router(
    sale_route.router,
)
router.include_router(
    project_route.router,
)
