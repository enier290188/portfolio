from fastapi import status
from fastapi.exceptions import HTTPException

Http404 = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail={
        'error': 'DealNotFound'
    },
)
