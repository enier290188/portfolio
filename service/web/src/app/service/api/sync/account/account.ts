import { appType } from '@./app'
import { api } from '../../api.ts'

type TypeSyncRequest = {
    accessToken: appType.TypeSettingAccessToken
    id: appType.TypeSettingUserModel['id']
}

const sync = async (request: TypeSyncRequest) => {
    return await api.post({
        resource: `/api/v1/sync/account/sync/`,
        accessToken: request.accessToken,
        body: {
            id: request.id,
        },
    })
}

export const account = {
    sync: sync,
}
