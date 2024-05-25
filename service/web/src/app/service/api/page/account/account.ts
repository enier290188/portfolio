import { appType } from '@./app'
import { api } from '../../api.ts'

type TypeLoginRequest = {
    email: string
    password: string
}
type TypeProfileGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeSettingUserModel['id']
}
type TypeProfileInfoUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserModel['id']
        name: appType.TypeSettingUserModel['name']
        email: appType.TypeSettingUserModel['email']
        phone: appType.TypeSettingUserModel['phone']
    }
}
type TypeProfilePictureUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserModel['id']
        picture: appType.TypeSettingUserModel['picture']
    }
}

const login = async (request: TypeLoginRequest) => {
    const response = await api.login({
        resource: `/api/v1/page/account/login/`,
        body: {
            username: request.email,
            password: request.password,
        },
    })
    if (response.status === 200) {
        return await api.post({
            resource: `/api/v1/page/account/login-sync/`,
            accessToken: response.data.access_token,
        })
    } else {
        return response
    }
}

const profile_get = async (request: TypeProfileGetRequest) => {
    return await api.post({
        resource: `/api/v1/page/account/profile/`,
        accessToken: request.accessToken,
        body: {
            id: request.id,
        },
    })
}

const profile_info_update = async (request: TypeProfileInfoUpdateRequest) => {
    return await api.patch({
        resource: `/api/v1/page/account/profile/info/`,
        accessToken: request.accessToken,
        body: {
            ...request.user,
        },
    })
}

const profile_picture_update = async (request: TypeProfilePictureUpdateRequest) => {
    return await api.patch({
        resource: `/api/v1/page/account/profile/picture/`,
        accessToken: request.accessToken,
        body: {
            ...request.user,
        },
    })
}

export const account = {
    login: login,
    profile_get: profile_get,
    profile_info_update: profile_info_update,
    profile_picture_update: profile_picture_update,
}
