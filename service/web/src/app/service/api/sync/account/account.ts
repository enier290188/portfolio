import { api } from '../../api.ts'
import { TypeSyncRequest } from './account.type.ts'

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
