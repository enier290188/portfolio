type TypePath = string

type TypeTo = Array<object | string>

type TypeId = string

export type TypeRoute = {
    app: {
        [KEY_PATH]: TypePath
        [KEY_TO]: () => TypeTo
        account: {
            [KEY_PATH]: TypePath
            [KEY_TO]: () => TypeTo
            forgot: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
            }
            login: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
            }
            logout: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
            }
            profile: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
                info: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
                password: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
                picture: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
            }
        }
        workspace: {
            [KEY_PATH]: TypePath
            [KEY_TO]: () => TypeTo
            admin: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
                dashboard: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
                lead: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                    create: {
                        [KEY_PATH]: TypePath
                        [KEY_TO]: () => TypeTo
                    }
                    ':id': {
                        update: {
                            [KEY_PATH]: TypePath
                            [KEY_TO]: (args: { id: TypeId }) => TypeTo
                        }
                        remove: {
                            [KEY_PATH]: TypePath
                            [KEY_TO]: (args: { id: TypeId }) => TypeTo
                        }
                    }
                }
                deal: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                    create: {
                        [KEY_PATH]: TypePath
                        [KEY_TO]: () => TypeTo
                    }
                    ':id': {
                        update: {
                            [KEY_PATH]: TypePath
                            [KEY_TO]: (args: { id: TypeId }) => TypeTo
                        }
                        remove: {
                            [KEY_PATH]: TypePath
                            [KEY_TO]: (args: { id: TypeId }) => TypeTo
                        }
                    }
                }
                setting: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                    application: {
                        [KEY_PATH]: TypePath
                        [KEY_TO]: () => TypeTo
                    }
                    user: {
                        [KEY_PATH]: TypePath
                        [KEY_TO]: () => TypeTo
                        create: {
                            [KEY_PATH]: TypePath
                            [KEY_TO]: () => TypeTo
                        }
                        ':id': {
                            update: {
                                [KEY_PATH]: TypePath
                                [KEY_TO]: (args: { id: TypeId }) => TypeTo
                            }
                            resetPassword: {
                                [KEY_PATH]: TypePath
                                [KEY_TO]: (args: { id: TypeId }) => TypeTo
                            }
                            remove: {
                                [KEY_PATH]: TypePath
                                [KEY_TO]: (args: { id: TypeId }) => TypeTo
                            }
                        }
                    }
                }
            }
            sale: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
                dashboard: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
                lead: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
            }
            project: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
                dashboard: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
                deal: {
                    [KEY_PATH]: TypePath
                    [KEY_TO]: () => TypeTo
                }
            }
        }
        error: {
            [KEY_PATH]: TypePath
            [KEY_TO]: () => TypeTo
            boundary: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
            }
            forbidden: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
            }
            notFound: {
                [KEY_PATH]: TypePath
                [KEY_TO]: () => TypeTo
            }
        }
    }
}
