import { TypeFetchDefaultDeleteRequest, TypeFetchDefaultGetRequest, TypeFetchDefaultPatchRequest, TypeFetchDefaultPostRequest, TypeFetchDefaultRequest, TypeFetchDefaultResponse, TypeFetchLoginRequest, TypeFetchLoginResponse, TypeFetchRequest, TypeFetchResponse, TypeFetchResponseError, TypeFetchResponseSuccessDefault, TypeFetchResponseSuccessError, TypeFetchResponseSuccessLogin } from './service.type.ts'

const SERVICE_API_PROTOCOL = import.meta.env.VITE_SERVICE_API_PROTOCOL
const SERVICE_API_DOMAIN = import.meta.env.VITE_SERVICE_API_DOMAIN
const SERVICE_API_PORT_EXTERNAL = import.meta.env.VITE_SERVICE_API_PORT_EXTERNAL

const __fetch_something_went_wrong__ = (): TypeFetchResponseError => {
    return {
        status: 400,
        data: {
            detail: {
                error: 'SomethingWentWrong',
            },
        },
    }
}

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
    try {
        const url = `${SERVICE_API_PROTOCOL}://${SERVICE_API_DOMAIN}:${SERVICE_API_PORT_EXTERNAL}${request.resource}`

        // Default options are marked with *
        const response: Response = await fetch(url, {
            method: request.options.method, // *GET, POST, PATCH, DELETE
            mode: request.options.mode, // no-cors, *cors, same-origin
            cache: request.options.cache, // *default, no-cache, reload, force-cache, only-if-cached
            credentials: request.options.credentials, // include, *same-origin, omit
            redirect: request.options.redirect, // manual, *follow, error
            referrerPolicy: request.options.referrerPolicy, // no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, *strict-origin-when-cross-origin, unsafe-url
            headers: request.options.headers,
            body: request.options.body, // body data type must match "Content-Type" header
        })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const status: TypeFetchResponse['status'] = response.status

        if (status === 401 || status === 403 || status === 404 || status === 409) {
            const data: TypeFetchResponseSuccessError['data'] = await response.json() // parses JSON response into native JavaScript objects
            if ('detail' in data && 'error' in data.detail) {
                return {
                    status: status,
                    data: data,
                }
            } else {
                return __fetch_something_went_wrong__()
            }
        }
        if (status === 200) {
            const data: TypeFetchResponseSuccessLogin['data'] | TypeFetchResponseSuccessDefault['data'] = await response.json() // parses JSON response into native JavaScript objects
            if ('auth' in data && 'access_token' in data.auth) {
                return {
                    status: status,
                    data: data,
                }
            } else {
                if ('access_token' in data) {
                    return {
                        status: status,
                        data: data,
                    }
                } else {
                    return __fetch_something_went_wrong__()
                }
            }
        }

        return __fetch_something_went_wrong__()
    } catch (_) {
        return __fetch_something_went_wrong__()
    }
}

const fetch_login = async (request: TypeFetchLoginRequest): Promise<TypeFetchLoginResponse> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

const fetch_default = async (request: TypeFetchDefaultRequest): Promise<TypeFetchDefaultResponse> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

const fetch_default_get = async (request: TypeFetchDefaultGetRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'GET',
    })
}

const fetch_default_post = async (request: TypeFetchDefaultPostRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'POST',
    })
}

const fetch_default_patch = async (request: TypeFetchDefaultPatchRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'PATCH',
    })
}

const fetch_default_delete = async (request: TypeFetchDefaultDeleteRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'DELETE',
    })
}

export const service = {
    login: fetch_login,
    get: fetch_default_get,
    post: fetch_default_post,
    patch: fetch_default_patch,
    delete: fetch_default_delete,
}
