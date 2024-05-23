import { service } from '../service.ts'

const sync = async (accessToken: string) => {
    return await service.get({
        resource: `/api/v1/auth/sync/`,
        accessToken: accessToken,
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

const profile = async (accessToken: string) => {
    return await service.get({
        resource: `/api/v1/auth/profile/`,
        accessToken: accessToken,
    })
}

export const account = {
    sync: sync,
    login: login,
    profile: profile,
}
