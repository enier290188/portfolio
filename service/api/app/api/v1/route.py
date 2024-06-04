from app.api.v1.data import (
    route as data_route,
)
from app.api.v1.page import (
    route as page_route,
)
from app.api.v1.sync import (
    route as sync_route,
)
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/v1',
)

router.include_router(
    data_route.router
)
router.include_router(
    page_route.router,
)
router.include_router(
    sync_route.router
)
