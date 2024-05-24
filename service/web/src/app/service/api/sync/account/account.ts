import { api } from '../../api.ts'

const sync = async (accessToken: string, id: string) => {
    return await api.post({
        resource: `/api/v1/sync/account/sync/`,
        accessToken: accessToken,
        body: {
            id: id,
        },
    })
}

export const account = {
    sync: sync,
}
