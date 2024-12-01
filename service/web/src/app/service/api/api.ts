import { TypeFetchDefaultDeleteRequest, TypeFetchDefaultGetRequest, TypeFetchDefaultPatchRequest, TypeFetchDefaultPostRequest, TypeFetchDefaultRequest, TypeFetchDefaultResponse, TypeFetchLoginRequest, TypeFetchLoginResponse, TypeFetchRequest, TypeFetchResponse, TypeFetchResponseError, TypeFetchResponseSuccessDefault, TypeFetchResponseSuccessError, TypeFetchResponseSuccessLogin } from './api.type.ts'

const SERVICE_API_PROTOCOL = import.meta.env.VITE_SERVICE_API_PROTOCOL
const SERVICE_API_DOMAIN = import.meta.env.VITE_SERVICE_API_DOMAIN
const SERVICE_API_PORT = import.meta.env.VITE_SERVICE_API_PORT

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
const __fetch__ = async (request: TypeFetchRequest): Promise<TypeFetchResponse> => {
    try {
        const input: string = `${SERVICE_API_PROTOCOL}://${SERVICE_API_DOMAIN}:${SERVICE_API_PORT}${request.resource}`
        // Default options are marked with *
        const init: RequestInit = {}
        init.method = request.options.method // *GET, POST, PATCH, DELETE
        init.headers = request.options.headers
        if (request.options.body) {
            // TypeError: Failed to execute 'fetch' on 'Window': Request with GET/HEAD method cannot have body.
            init.body = request.options.body // body data type must match "Content-Type" header
        }
        init.mode = request.options?.mode ?? 'cors' // no-cors, *cors, same-origin
        init.cache = request.options?.cache ?? 'no-cache' // *default, no-cache, reload, force-cache, only-if-cached
        init.credentials = request.options?.credentials ?? 'same-origin' // include, *same-origin, omit
        init.redirect = request.options?.redirect ?? 'follow' // manual, *follow, error
        init.referrerPolicy = request.options?.referrerPolicy ?? 'no-referrer' // no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, *strict-origin-when-cross-origin, unsafe-url

        const response: Response = await fetch(input, init)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let status: TypeFetchResponse['status'] = response.status
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (status === 201) {
            status = 200
        }

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
            body: request.body === null ? request.body : JSON.stringify(request.body),
        },
    })
}

const fetch_default_get = async (request: TypeFetchDefaultGetRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'GET',
        body: null,
    })
}

const fetch_default_post = async (request: TypeFetchDefaultPostRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'POST',
        body: request?.body ? request.body : {},
    })
}

const fetch_default_patch = async (request: TypeFetchDefaultPatchRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'PATCH',
        body: request?.body ? request.body : {},
    })
}

const fetch_default_delete = async (request: TypeFetchDefaultDeleteRequest): Promise<TypeFetchDefaultResponse> => {
    return await fetch_default({
        ...request,
        method: 'DELETE',
        body: request?.body ? request.body : {},
    })
}

export const api = {
    login: fetch_login,
    get: fetch_default_get,
    post: fetch_default_post,
    patch: fetch_default_patch,
    delete: fetch_default_delete,
}
