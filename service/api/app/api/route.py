from app.api.v1 import (
    route as v1_route,
)
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/api',
)

router.include_router(
    v1_route.router,
)
