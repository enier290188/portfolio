import { api } from '../../../api.ts'
import { TypeCompanyCreateRequest, TypeCompanyFetchRequest, TypeCompanyGetRequest, TypeCompanyRemoveRequest, TypeCompanyUpdateRequest, TypeUserFetchRequest, TypeUserGetRequest, TypeUserRemoveRequest, TypeUserResetPasswordRequest, TypeUserUpdateRequest } from './root.type.ts'

const company_fetch = async (request: TypeCompanyFetchRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/company/`,
        accessToken: request.accessToken,
    })
}

const company_create = async (request: TypeCompanyCreateRequest) => {
    return await api.post({
        resource: `/api/v1/page/workspace/root/company/`,
        accessToken: request.accessToken,
        body: {
            ...request.company,
        },
    })
}

const company_get = async (request: TypeCompanyGetRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/company/${request.id}/`,
        accessToken: request.accessToken,
    })
}

const company_update = async (request: TypeCompanyUpdateRequest) => {
    return await api.patch({
        resource: `/api/v1/page/workspace/root/company/${request.company.id}/`,
        accessToken: request.accessToken,
        body: {
            ...request.company,
        },
    })
}

const company_remove = async (request: TypeCompanyRemoveRequest) => {
    return await api.delete({
        resource: `/api/v1/page/workspace/root/company/${request.company.id}/`,
        accessToken: request.accessToken,
        body: {
            ...request.company,
        },
    })
}

const user_fetch = async (request: TypeUserFetchRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/user/`,
        accessToken: request.accessToken,
    })
}

const user_get = async (request: TypeUserGetRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/user/${request.id}/`,
        accessToken: request.accessToken,
    })
}

const user_update = async (request: TypeUserUpdateRequest) => {
    return await api.patch({
        resource: `/api/v1/page/workspace/root/user/${request.user.id}/`,
        accessToken: request.accessToken,
        body: {
            ...request.user,
        },
    })
}

const user_reset_password = async (request: TypeUserResetPasswordRequest) => {
    return await api.patch({
        resource: `/api/v1/page/workspace/root/user/${request.user.id}/reset-password/`,
        accessToken: request.accessToken,
        body: {
            ...request.user,
        },
    })
}

const user_remove = async (request: TypeUserRemoveRequest) => {
    return await api.delete({
        resource: `/api/v1/page/workspace/root/user/${request.user.id}/`,
        accessToken: request.accessToken,
        body: {
            ...request.user,
        },
    })
}

export const root = {
    company_fetch: company_fetch,
    company_create: company_create,
    company_get: company_get,
    company_update: company_update,
    company_remove: company_remove,
    user_fetch: user_fetch,
    user_get: user_get,
    user_update: user_update,
    user_reset_password: user_reset_password,
    user_remove: user_remove,
}
