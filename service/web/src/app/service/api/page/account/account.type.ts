import { appType } from '@./app'

export type TypeLoginRequest = {
    email: string
    password: string
}

export type TypeProfileGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeModelUser['id']
}
export type TypeProfileInfoUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeModelUser['id']
        name: appType.TypeModelUser['name']
        email: appType.TypeModelUser['email']
        phone: appType.TypeModelUser['phone']
    }
}
export type TypeProfilePasswordUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeModelUser['id']
        password_current: string
        password_new: string
    }
}
export type TypeProfilePictureUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeModelUser['id']
        picture: appType.TypeModelUser['picture']
    }
}
