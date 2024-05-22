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
        return await index(response.data.access_token)
    } else {
        return response
    }
}

const index = async (accessToken: string) => {
    return await service.post({
        resource: `/api/v1/auth/index/`,
        accessToken: accessToken,
        body: null,
    })
}

export const account = {
    login: login,
    index: index,
}
