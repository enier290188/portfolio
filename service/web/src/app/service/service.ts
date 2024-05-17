import { TypeFetchCrudGetRequest, TypeFetchCrudPostRequest, TypeFetchCrudRequest, TypeFetchCrudResponse, TypeFetchLoginRequest, TypeFetchLoginResponse, TypeFetchRequest, TypeFetchResponse } from './service.type.ts'

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

const __fetch_crud__ = async (request: TypeFetchCrudRequest): Promise<TypeFetchCrudResponse> => {
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

const login = async (request: TypeFetchLoginRequest): Promise<TypeFetchLoginResponse> => {
    const response = await __fetch__({
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
    return {
        status: response.status,
        data: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            access_token: response.data.access_token,
        },
    }
}

const get = async (request: TypeFetchCrudGetRequest) => {
    return await __fetch_crud__({
        resource: request.resource,
        method: 'GET',
        accessToken: request.accessToken,
        body: request.body,
    })
}

const post = async (request: TypeFetchCrudPostRequest) => {
    return await __fetch_crud__({
        resource: request.resource,
        method: 'POST',
        accessToken: request.accessToken,
        body: request.body,
    })
}

export const service = {
    login: login,
    get: get,
    post: post,
}
