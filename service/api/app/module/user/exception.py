from fastapi import status
from fastapi.exceptions import HTTPException

Http404 = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User not found',
)

Http409Email = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail='Email already exists',
)
