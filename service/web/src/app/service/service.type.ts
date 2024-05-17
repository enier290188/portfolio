export type TypeFetchRequest = {
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
export type TypeFetchResponse = {
    status: number
    data: object
}

export type TypeFetchLoginRequest = {
    resource: string
    body: {
        username: string
        password: string
    }
}
export type TypeFetchLoginResponse = TypeFetchResponse & {
    data: {
        access_token: string
    }
}

export type TypeFetchCrudRequest = {
    resource: string
    method: TypeFetchRequest['options']['method']
    accessToken: string
    body: null | object
}
export type TypeFetchCrudResponse = TypeFetchResponse

export type TypeFetchCrudGetRequest = Omit<TypeFetchCrudRequest, 'method'>
export type TypeFetchCrudPostRequest = Omit<TypeFetchCrudRequest, 'method'>
export type TypeFetchCrudPatchRequest = Omit<TypeFetchCrudRequest, 'method'>
export type TypeFetchCrudDeleteRequest = Omit<TypeFetchCrudRequest, 'method'>
