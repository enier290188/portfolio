import { api } from '../../../api.ts'
import { TypeCompanyFetchRequest } from './root.type.ts'

const company_fetch = async (request: TypeCompanyFetchRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/company/`,
        accessToken: request.accessToken,
    })
}

export const root = {
    company_fetch: company_fetch,
}
