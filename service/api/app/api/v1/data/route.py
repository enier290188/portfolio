from app.api.v1.data import (
    schema as api_schema,
)
from app.module.auth import (
    dependency as auth_dependency,
    exception as auth_exception,
)
from app.module.company import (
    service as company_service,
)
from app.module.db import (
    dependency as db_dependency,
)
from app.module.lead import (
    service as lead_service,
)
from app.module.user import (
    hashing as user_hashing,
    service as user_service,
)
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/data',
    tags=['api.v1.data'],
)


@router.post(path='/init/', response_model=None)
async def init(request: api_schema.InitRequest, auth_response: auth_dependency.DependAuthRoot, db_async_session: db_dependency.DependDBAsyncSession):
    data = dict(**request.model_dump())
    data_id: str = data.get('id', '')
    auth_user_id: str = auth_response.auth.user.id
    if auth_user_id != data_id:
        raise auth_exception.Http403UserNotAllowed

    # Companies
    company_orm_list = await company_service.fetch(db_async_session)
    for i in range(1, 11, 1):
        exist = False
        name = 'Company {index:03d}'.format(index=i)
        for j in range(0, len(company_orm_list), 1):
            company_orm = company_orm_list[j]
            if company_orm.name == name:
                exist = True
                await company_service.update(
                    db_async_session,
                    company_orm.id,
                    {
                        'name': 'Company {index:03d}'.format(index=i),
                    }
                )
                break
        if not exist:
            await company_service.create(
                db_async_session,
                {
                    'name': 'Company {index:03d}'.format(index=i),
                    'email': '',
                    'phone': '',
                    'is_active': False,
                }
            )

    # Users
    for i in range(1, 101, 1):
        email = 'enier{index:03d}@example.com'.format(index=i)
        user_orm = await user_service.get_by_email(db_async_session, email)
        if user_orm is None:
            await user_service.create(
                db_async_session,
                {
                    'name': 'Enier {index:03d}'.format(index=i),
                    'email': 'enier{index:03d}@example.com'.format(index=i),
                    'phone': '7572300{index:03d}'.format(index=i),
                    'password': user_hashing.get_password_hash(password_plain='@Abc@12345@'),
                    'is_active': False,
                    'has_permission_of_root': False,
                    'has_permission_of_admin': False,
                    'has_permission_of_sale': False,
                    'has_permission_of_project': False,
                    'company_id': None,
                }
            )
        else:
            if not user_orm.has_permission_of_root:
                await user_service.update(
                    db_async_session,
                    user_orm.id,
                    {
                        'name': 'Enier {index:03d}'.format(index=i),
                        'email': 'enier{index:03d}@example.com'.format(index=i),
                        'phone': '7572300{index:03d}'.format(index=i),
                        'password': user_hashing.get_password_hash(password_plain='@Abc@12345@'),
                    }
                )

    # Leads
    lead_orm_list = await lead_service.fetch(db_async_session)
    for i in range(1, 11, 1):
        exist = False
        name = 'Lead {index:05d}'.format(index=i)
        for j in range(0, len(lead_orm_list), 1):
            lead_orm = lead_orm_list[j]
            if lead_orm.name == name:
                exist = True
                await lead_service.update(
                    db_async_session,
                    lead_orm.id,
                    {
                        'name': 'Lead {index:05d}'.format(index=i),
                    }
                )
                break
        if not exist:
            await lead_service.create(
                db_async_session,
                {
                    'name': 'Lead {index:05d}'.format(index=i),
                    'email': 'lead{index:05d}@gmail.com'.format(index=i),
                    'phone': '',
                }
            )

    return None
