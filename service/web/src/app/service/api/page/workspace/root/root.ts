import { api } from '../../../api.ts'
import { TypeCompanyFetchRequest, TypeCompanyGetRequest, TypeCompanyUpdateRequest } from './root.type.ts'

const company_fetch = async (request: TypeCompanyFetchRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/company/`,
        accessToken: request.accessToken,
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

export const root = {
    company_fetch: company_fetch,
    company_get: company_get,
    company_update: company_update,
}
