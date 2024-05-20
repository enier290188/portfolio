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
            resource: `/api/v1/auth/index/`,
            accessToken: response.data.access_token,
            body: null,
        })
    } else {
        return response
    }
}

export const account = {
    login: login,
}
