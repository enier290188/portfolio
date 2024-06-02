from app.api.v1.sync.account import (
    route as account_route,
)
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/sync',
)

router.include_router(
    account_route.router,
)
