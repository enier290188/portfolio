import { service } from '../service.ts'

const login = async (email: string, password: string) => {
    try {
        const responseLogin = await service.login(`/api/v1/auth/login/`, { username: email, password: password })
        switch (responseLogin.status) {
            case 200: {
                const response = responseLogin.data
                console.log(response)
                const responseIndex = await fetch(`${import.meta.env.VITE_SERVICE_WEB_SERVER_API}/api/v1/auth/index/`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${response['access_token']}`,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({}),
                })
                return await responseIndex.json()
            }
            case 401: {
                return await responseLogin.data()
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
