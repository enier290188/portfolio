type TypeFetchRequest = {
    resource: string
    options: {
        method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
        headers: {
            'Content-Type': 'application/json' | 'application/x-www-form-urlencoded'
            Authorization?: string
        }
        body: null | BodyInit
        mode?: 'no-cors' | 'cors' | 'same-origin'
        cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'
        credentials?: 'include' | 'same-origin' | 'omit'
        redirect?: 'manual' | 'follow' | 'error'
        referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
    }
}
type TypeFetchResponse = {
    status: number
    data: object
}

const SERVICE_WEB_SERVER_API = import.meta.env.VITE_SERVICE_WEB_SERVER_API

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const __fetch__ = async (
    request: TypeFetchRequest = {
        resource: '',
        options: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: null,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        },
    },
): Promise<TypeFetchResponse> => {
    const url = `${SERVICE_WEB_SERVER_API}${request.resource}`

    // Default options are marked with *
    const response = await fetch(url, {
        method: request.options.method, // *GET, POST, PATCH, DELETE
        mode: request.options.mode, // no-cors, *cors, same-origin
        cache: request.options.cache, // *default, no-cache, reload, force-cache, only-if-cached
        credentials: request.options.credentials, // include, *same-origin, omit
        redirect: request.options.redirect, // manual, *follow, error
        referrerPolicy: request.options.referrerPolicy, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: request.options.headers,
        body: request.options.body, // body data type must match "Content-Type" header
    })

    const status: number = response.status
    const data: object = await response.json() // parses JSON response into native JavaScript objects

    return {
        status: status,
        data: data,
    }
}

const login = async (request: { resource: string; body: { username: string; password: string } }) => {
    return await __fetch__({
        resource: request.resource,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: request.body.username,
                password: request.body.password,
            }),
        },
    })
}

const crud = async (request: { resource: string; method: TypeFetchRequest['options']['method']; accessToken: string; body: null | object }) => {
    return await __fetch__({
        resource: request.resource,
        options: {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${request.accessToken}`,
            },
            body: JSON.stringify(request.body),
        },
    })
}

const crud_get = async (request: { resource: string; accessToken: string; body: null | object }) => {
    return await crud({
        resource: request.resource,
        method: 'GET',
        accessToken: request.accessToken,
        body: request.body,
    })
}

const crud_post = async (request: { resource: string; accessToken: string; body: null | object }) => {
    return await crud({
        resource: request.resource,
        method: 'POST',
        accessToken: request.accessToken,
        body: request.body,
    })
}

export const service = {
    login: login,
    crud: {
        get: crud_get,
        post: crud_post,
    },
}
