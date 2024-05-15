import { value } from './route.value.ts'

type TypePath = string

type TypeTo = Array<object | string>

type TypeId = string

export type TypeRouteStructure = {
    app: {
        [value.PATH]: TypePath
        [value.TO]: () => TypeTo
        account: {
            [value.PATH]: TypePath
            [value.TO]: () => TypeTo
            forgot: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
            }
            login: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
            }
            logout: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
            }
            profile: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
                info: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
                password: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
                picture: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
            }
        }
        workspace: {
            [value.PATH]: TypePath
            [value.TO]: () => TypeTo
            admin: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
                dashboard: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
                lead: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                    create: {
                        [value.PATH]: TypePath
                        [value.TO]: () => TypeTo
                    }
                    ':id': {
                        update: {
                            [value.PATH]: TypePath
                            [value.TO]: (args: { id: TypeId }) => TypeTo
                        }
                        remove: {
                            [value.PATH]: TypePath
                            [value.TO]: (args: { id: TypeId }) => TypeTo
                        }
                    }
                }
                deal: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                    create: {
                        [value.PATH]: TypePath
                        [value.TO]: () => TypeTo
                    }
                    ':id': {
                        update: {
                            [value.PATH]: TypePath
                            [value.TO]: (args: { id: TypeId }) => TypeTo
                        }
                        remove: {
                            [value.PATH]: TypePath
                            [value.TO]: (args: { id: TypeId }) => TypeTo
                        }
                    }
                }
                setting: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                    application: {
                        [value.PATH]: TypePath
                        [value.TO]: () => TypeTo
                    }
                    user: {
                        [value.PATH]: TypePath
                        [value.TO]: () => TypeTo
                        create: {
                            [value.PATH]: TypePath
                            [value.TO]: () => TypeTo
                        }
                        ':id': {
                            update: {
                                [value.PATH]: TypePath
                                [value.TO]: (args: { id: TypeId }) => TypeTo
                            }
                            resetPassword: {
                                [value.PATH]: TypePath
                                [value.TO]: (args: { id: TypeId }) => TypeTo
                            }
                            remove: {
                                [value.PATH]: TypePath
                                [value.TO]: (args: { id: TypeId }) => TypeTo
                            }
                        }
                    }
                }
            }
            sale: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
                dashboard: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
                lead: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
            }
            project: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
                dashboard: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
                deal: {
                    [value.PATH]: TypePath
                    [value.TO]: () => TypeTo
                }
            }
        }
        error: {
            [value.PATH]: TypePath
            [value.TO]: () => TypeTo
            boundary: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
            }
            forbidden: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
            }
            notFound: {
                [value.PATH]: TypePath
                [value.TO]: () => TypeTo
            }
        }
    }
}
