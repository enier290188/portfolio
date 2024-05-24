import { service } from '../service.ts'

const login = async (email: string, password: string) => {
    const response = await service.login({
        resource: `/api/v1/auth/login/`,
        body: {
            username: email,
            password: password,
        },
    })
    if (response.status === 200) {
        return await service.post({
            resource: `/api/v1/auth/login-sync/`,
            accessToken: response.data.access_token,
        })
    } else {
        return response
    }
}

const sync = async (accessToken: string, id: string) => {
    return await service.post({
        resource: `/api/v1/auth/sync/`,
        accessToken: accessToken,
        body: {
            id: id,
        },
    })
}

const profile = async (accessToken: string, id: string) => {
    return await service.get({
        resource: `/api/v1/auth/profile/${id}/`,
        accessToken: accessToken,
    })
}

export const account = {
    sync: sync,
    login: login,
    profile: profile,
}
