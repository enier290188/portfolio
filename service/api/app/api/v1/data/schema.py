from pydantic.main import BaseModel
from pydantic.types import UUID4


class InitRequest(BaseModel):
    id: UUID4
