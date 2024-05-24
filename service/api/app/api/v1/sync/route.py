from fastapi.routing import APIRouter

from app.api.v1.sync.account import (
    route as account_route,
)

router = APIRouter(
    prefix='/sync',
)

router.include_router(
    account_route.router,
)
