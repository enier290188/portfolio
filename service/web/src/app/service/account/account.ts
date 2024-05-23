import { service } from '../service.ts'

const sync = async (accessToken: string) => {
    return await service.get({
        resource: `/api/v1/auth/sync/`,
        accessToken: accessToken,
        body: null,
    })
}
const login = async (email: string, password: string) => {
    const response = await service.login({
        resource: `/api/v1/auth/login/`,
        body: {
            username: email,
            password: password,
        },
    })
    if (response.status === 200) {
        return await sync(response.data.access_token)
    } else {
        return response
    }
}

export const account = {
    sync: sync,
    login: login,
}
