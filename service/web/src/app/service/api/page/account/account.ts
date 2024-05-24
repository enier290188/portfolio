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

const profile_get = async (accessToken: string, id: string) => {
    return await api.post({
        resource: `/api/v1/page/account/profile/`,
        accessToken: accessToken,
        body: {
            id: id,
        },
    })
}

const profile_info_update = async (accessToken: string, id: string, name: string, phone: string) => {
    return await api.patch({
        resource: `/api/v1/page/account/profile/`,
        accessToken: accessToken,
        body: {
            id: id,
            name: name,
            phone: phone,
        },
    })
}

export const account = {
    login: login,
    profile_get: profile_get,
    profile_info_update: profile_info_update,
}
