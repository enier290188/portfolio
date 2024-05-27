import { appType } from '@./app'

export type TypeLoginRequest = {
    email: string
    password: string
}

export type TypeProfileGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeSettingUserModel['id']
}
export type TypeProfileInfoUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserModel['id']
        name: appType.TypeSettingUserModel['name']
        email: appType.TypeSettingUserModel['email']
        phone: appType.TypeSettingUserModel['phone']
    }
}
export type TypeProfilePasswordUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserModel['id']
        password_current: string
        password_new: string
    }
}
export type TypeProfilePictureUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserModel['id']
        picture: appType.TypeSettingUserModel['picture']
    }
}
