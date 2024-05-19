import { TypeFetchCrudDeleteRequest, TypeFetchCrudGetRequest, TypeFetchCrudPatchRequest, TypeFetchCrudPostRequest, TypeFetchCrudRequest, TypeFetchCrudResponse, TypeFetchLoginRequest, TypeFetchLoginResponse, TypeFetchRequest, TypeFetchResponse } from './service.type.ts'

const SERVICE_API_PROTOCOL = import.meta.env.VITE_SERVICE_API_PROTOCOL
const SERVICE_API_DOMAIN = import.meta.env.VITE_SERVICE_API_DOMAIN
const SERVICE_API_PORT_EXTERNAL = import.meta.env.VITE_SERVICE_API_PORT_EXTERNAL

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
    console.log('')
    console.log('**********')
    try {
        const url = `${SERVICE_API_PROTOCOL}:>//${SERVICE_API_DOMAIN}:${SERVICE_API_PORT_EXTERNAL}${request.resource}`

        console.log(url)

        // Default options are marked with *
        const response = await fetch(url, {
            method: request.options.method, // *GET, POST, PATCH, DELETE
            mode: request.options.mode, // no-cors, *cors, same-origin
            cache: request.options.cache, // *default, no-cache, reload, force-cache, only-if-cached
            credentials: request.options.credentials, // include, *same-origin, omit
            redirect: request.options.redirect, // manual, *follow, error
            referrerPolicy: request.options.referrerPolicy, // no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, *strict-origin-when-cross-origin, unsafe-url
            headers: request.options.headers,
            body: request.options.body, // body data type must match "Content-Type" header
        })

        const status: number = response.status
        const data: object = await response.json() // parses JSON response into native JavaScript objects

        console.log(data)

        return {
            status: status,
            data: data,
        }
    } catch (error) {
        console.log(error)

        return {
            status: 400,
            error: 'SomethingWentWrong',
        }
    }
}

const fetch_login = async (request: TypeFetchLoginRequest): Promise<TypeFetchLoginResponse> => {
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

const fetch_crud = async (request: TypeFetchCrudRequest): Promise<TypeFetchCrudResponse> => {
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

const fetch_crud_get = async (request: TypeFetchCrudGetRequest): Promise<TypeFetchCrudResponse> => {
    return await fetch_crud({
        ...request,
        method: 'GET',
    })
}

const fetch_crud_post = async (request: TypeFetchCrudPostRequest): Promise<TypeFetchCrudResponse> => {
    return await fetch_crud({
        ...request,
        method: 'POST',
    })
}

const fetch_crud_patch = async (request: TypeFetchCrudPatchRequest): Promise<TypeFetchCrudResponse> => {
    return await fetch_crud({
        ...request,
        method: 'PATCH',
    })
}

const fetch_crud_delete = async (request: TypeFetchCrudDeleteRequest): Promise<TypeFetchCrudResponse> => {
    return await fetch_crud({
        ...request,
        method: 'DELETE',
    })
}

export const service = {
    login: fetch_login,
    get: fetch_crud_get,
    post: fetch_crud_post,
    patch: fetch_crud_patch,
    delete: fetch_crud_delete,
}
