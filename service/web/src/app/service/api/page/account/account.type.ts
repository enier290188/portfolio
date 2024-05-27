import { appType } from '@./app'

export type TypeLoginRequest = {
    email: string
    password: string
}

export type TypeProfileGetRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeSettingUserResponse['id']
}
export type TypeProfileInfoUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserResponse['id']
        name: appType.TypeSettingUserResponse['name']
        email: appType.TypeSettingUserResponse['email']
        phone: appType.TypeSettingUserResponse['phone']
    }
}
export type TypeProfilePasswordUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserResponse['id']
        password_current: string
        password_new: string
    }
}
export type TypeProfilePictureUpdateRequest = {
    accessToken: appType.TypeSettingAccessToken
    user: {
        id: appType.TypeSettingUserResponse['id']
        picture: appType.TypeSettingUserResponse['picture']
    }
}
