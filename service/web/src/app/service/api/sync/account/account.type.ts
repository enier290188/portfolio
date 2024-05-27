import { appType } from '@./app'

export type TypeSyncRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeSettingUserModel['id']
}
