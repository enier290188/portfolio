import { api } from '../../api.ts'

const login = async (email: string, password: string) => {
    const response = await api.login({
        resource: `/api/v1/page/account/login/`,
        body: {
            username: email,
            password: password,
        },
    })
    if (response.status === 200) {
        return await api.post({
            resource: `/api/v1/page/account/login-sync/`,
            accessToken: response.data.access_token,
        })
    } else {
        return response
    }
}

const profile = async (accessToken: string, id: string) => {
    return await api.post({
        resource: `/api/v1/page/account/profile/`,
        accessToken: accessToken,
        body: {
            id: id,
        },
    })
}

export const account = {
    login: login,
    profile: profile,
}
