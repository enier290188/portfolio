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
export type TypeFetchLoginRequest = {
    resource: string
    body: {
        username: string
        password: string
    }
}
export type TypeFetchDefaultRequest = {
    resource: string
    method: TypeFetchRequest['options']['method']
    accessToken: string
    body: null | object
}
export type TypeFetchDefaultGetRequest = Omit<TypeFetchDefaultRequest, 'method'>
export type TypeFetchDefaultPostRequest = Omit<TypeFetchDefaultRequest, 'method'>
export type TypeFetchDefaultPatchRequest = Omit<TypeFetchDefaultRequest, 'method'>
export type TypeFetchDefaultDeleteRequest = Omit<TypeFetchDefaultRequest, 'method'>

export type TypeFetchResponseError = {
    status: 400
    data: {
        detail: {
            error: 'SomethingWentWrong'
        }
    }
}
export type TypeFetchResponseSuccessError = {
    status: 401 | 403 | 404 | 409
    data: {
        detail: {
            error: string
        }
    }
}
export type TypeFetchResponseSuccessLogin = {
    status: 200
    data: {
        access_token: string
    }
}
export type TypeFetchResponseSuccessDefault = {
    status: 200
    data: {
        auth: {
            access_token: string
            user: {
                id: string
                name: string
                email: string
                phone: string
                picture: string
                has_permission_of_root: boolean
                has_permission_of_admin: boolean
                has_permission_of_sale: boolean
                has_permission_of_project: boolean
                company_id: null | string
            }
        }
        items?: null | []
        item?: null | object
    }
}
export type TypeFetchResponse = TypeFetchResponseError | TypeFetchResponseSuccessError | TypeFetchResponseSuccessLogin | TypeFetchResponseSuccessDefault

export type TypeFetchLoginResponse = TypeFetchResponseError | TypeFetchResponseSuccessError | TypeFetchResponseSuccessLogin
export type TypeFetchDefaultResponse = TypeFetchResponseError | TypeFetchResponseSuccessError | TypeFetchResponseSuccessDefault
