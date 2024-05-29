import { appType } from '@./app'

export type TypeCompanyFetchRequest = {
    accessToken: appType.TypeSettingAccessToken
}

export type TypeCompanyGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeModelCompany['id']
}

export type TypeCompanyUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    company: {
        id: appType.TypeModelCompany['id']
        name: appType.TypeModelCompany['name']
        email: appType.TypeModelCompany['email']
        phone: appType.TypeModelCompany['phone']
        is_active: appType.TypeModelCompany['is_active']
    }
}
