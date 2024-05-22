export type TypeWrapperAccessToken = string

export type TypeContext = {
    getAccessToken: () => TypeWrapperAccessToken
    updateAccessToken: (value: TypeWrapperAccessToken) => void
    removeAccessToken: () => void
}
