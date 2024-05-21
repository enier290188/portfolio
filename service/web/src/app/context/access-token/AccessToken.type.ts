export type TypeWrapper = string

export type TypeContext = {
    get: () => TypeWrapper
    update: (accessToken: TypeWrapper) => void
}
