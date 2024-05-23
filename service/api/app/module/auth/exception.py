from fastapi import status
from fastapi.exceptions import HTTPException

Http401CouldNotValidateUserCredentials = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'CouldNotValidateUserCredentials'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401IncorrectUsernameOrPassword = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'IncorrectUsernameOrPassword'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401UserInactive = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'UserInactive'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401UserMustBelongToAGroup = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'UserMustBelongToAGroup'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401UserMustBelongToACompany = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'UserMustBelongToACompany'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserHasNotPermissionOfRoot = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'UserHasNotPermissionOfRoot'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserHasNotPermissionOfAdmin = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'UserHasNotPermissionOfAdmin'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserHasNotPermissionOfSale = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'UserHasNotPermissionOfSale'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserHasNotPermissionOfProject = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'UserHasNotPermissionOfProject'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserNotAllowed = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'UserNotAllowed'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserNotAllowedToUpdateAttribute = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'UserNotAllowedToUpdateAttribute'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http404UserNotFound = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail={
        'error': 'UserNotFound'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)
