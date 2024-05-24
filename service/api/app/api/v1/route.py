from fastapi.routing import APIRouter

from app.api.v1.page import (
    route as page_route,
)

router = APIRouter(
    prefix='/page',
)

router.include_router(
    page_route.router,
)
