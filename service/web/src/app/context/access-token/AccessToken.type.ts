import { appType } from '@./app'

export type TypeWrapperAccessToken = appType.TypeSettingAccessToken

export type TypeContext = {
    getAccessToken: () => TypeWrapperAccessToken
    updateAccessToken: (value: TypeWrapperAccessToken) => void
    removeAccessToken: () => void
}
