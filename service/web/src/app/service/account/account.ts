import { service } from '../service.ts'

const login = async (email: string, password: string) => {
    try {
        console.log('Login')
        const responseLogin = await service.login({
            resource: `/api/v1/auth/login/`,
            body: {
                username: email,
                password: password,
            },
        })

        console.log('Index')
        switch (responseLogin.status) {
            case 200: {
                const responseIndex = await service.post({
                    resource: `/api/v1/auth/index/`,
                    accessToken: responseLogin.data.access_token,
                    body: null,
                })
                return responseIndex
            }
            case 401: {
                return responseLogin
            }
        }
    } catch (error) {
        console.log('Error')
        console.log(error)
    }
    return null
}

export const account = {
    login: login,
}
