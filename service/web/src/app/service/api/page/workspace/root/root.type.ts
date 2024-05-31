import { appType } from '@./app'

export type TypeCompanyFetchRequest = {
    accessToken: appType.TypeSettingAccessToken
}

export type TypeCompanyGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeModelCompany['id']
}

export type TypeCompanyCreateRequest = {
    accessToken: appType.TypeSettingAccessToken
    company: {
        name: appType.TypeModelCompany['name']
        email: appType.TypeModelCompany['email']
        phone: appType.TypeModelCompany['phone']
        is_active: appType.TypeModelCompany['is_active']
    }
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

export type TypeCompanyRemoveRequest = {
    accessToken: appType.TypeSettingAccessToken
    company: {
        id: appType.TypeModelCompany['id']
        name: appType.TypeModelCompany['name']
        email: appType.TypeModelCompany['email']
        phone: appType.TypeModelCompany['phone']
        is_active: appType.TypeModelCompany['is_active']
    }
}

export type TypeUserFetchRequest = {
    accessToken: appType.TypeSettingAccessToken
}

export type TypeUserGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeModelUser['id']
}

export type TypeUserUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeModelUser['id']
        name: appType.TypeModelUser['name']
        email: appType.TypeModelUser['email']
        phone: appType.TypeModelUser['phone']
        is_active: appType.TypeModelUser['is_active']
    }
}
