import { appType } from '@./app'
import { api } from '../../../api.ts'

type TypeCompanyFetchRequest = {
    accessToken: appType.TypeSettingAccessToken
}

const company_fetch = async (request: TypeCompanyFetchRequest) => {
    return await api.get({
        resource: `/api/v1/page/workspace/root/company/`,
        accessToken: request.accessToken,
    })
}

export const root = {
    company_fetch: company_fetch,
}
