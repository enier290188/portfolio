from fastapi import status
from fastapi.exceptions import HTTPException

Http401IncorrectUsernameOrPassword = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'IncorrectUsernameOrPassword'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401InactiveUser = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'InactiveUser'
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

Http401CouldNotValidateUserCredentials = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail={
        'error': 'CouldNotValidateUserCredentials'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403 = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'Forbidden'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403ForbiddenUserHasNotPermissionOfRoot = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'ForbiddenUserHasNotPermissionOfRoot'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403ForbiddenUserHasNotPermissionOfAdmin = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'ForbiddenUserHasNotPermissionOfAdmin'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403ForbiddenUserHasNotPermissionOfSale = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'ForbiddenUserHasNotPermissionOfSale'
    },
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403ForbiddenUserHasNotPermissionOfProject = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail={
        'error': 'ForbiddenUserHasNotPermissionOfProject'
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
