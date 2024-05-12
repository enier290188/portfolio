from fastapi import status
from fastapi.exceptions import HTTPException

Http401 = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Unauthorized',
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401IncorrectUsernameOrPassword = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Incorrect username or password',
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401CouldNotValidateUserCredentials = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Could not validate user credentials',
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401InactiveUser = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Inactive user',
    headers={'WWW-Authenticate': 'Bearer'},
)

Http401UserMustBelongToACompany = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='User must belong to a company',
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403 = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='Forbidden',
    headers={'WWW-Authenticate': 'Bearer'},
)

Http403UserNotAllowedToUpdateAttribute = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='User not allowed to update attribute',
    headers={'WWW-Authenticate': 'Bearer'},
)
