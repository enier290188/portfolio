import { KEY_PATH, KEY_TO, TypeStructure } from './route.type.ts'

const STRUCTURE: TypeStructure = {
    app: {
        [KEY_PATH]: 'app',
        [KEY_TO]: () => [STRUCTURE.app[KEY_PATH]],
        account: {
            [KEY_PATH]: 'account',
            [KEY_TO]: () => [...STRUCTURE.app[KEY_TO](), STRUCTURE.app.account[KEY_PATH]],
            forgot: {
                [KEY_PATH]: 'forgot',
                [KEY_TO]: () => [...STRUCTURE.app.account[KEY_TO](), STRUCTURE.app.account.forgot[KEY_PATH]]
            },
            login: {
                [KEY_PATH]: 'login',
                [KEY_TO]: () => [...STRUCTURE.app.account[KEY_TO](), STRUCTURE.app.account.login[KEY_PATH]]
            },
            logout: {
                [KEY_PATH]: 'logout',
                [KEY_TO]: () => [...STRUCTURE.app.account[KEY_TO](), STRUCTURE.app.account.logout[KEY_PATH]]
            },
            profile: {
                [KEY_PATH]: 'profile',
                [KEY_TO]: () => [...STRUCTURE.app.account[KEY_TO](), STRUCTURE.app.account.profile[KEY_PATH]],
                info: {
                    [KEY_PATH]: 'info',
                    [KEY_TO]: () => [...STRUCTURE.app.account.profile[KEY_TO](), STRUCTURE.app.account.profile.info[KEY_PATH]]
                },
                password: {
                    [KEY_PATH]: 'password',
                    [KEY_TO]: () => [...STRUCTURE.app.account.profile[KEY_TO](), STRUCTURE.app.account.profile.password[KEY_PATH]]
                },
                picture: {
                    [KEY_PATH]: 'picture',
                    [KEY_TO]: () => [...STRUCTURE.app.account.profile[KEY_TO](), STRUCTURE.app.account.profile.picture[KEY_PATH]]
                }
            }
        },
        workspace: {
            [KEY_PATH]: 'workspace',
            [KEY_TO]: () => [...STRUCTURE.app[KEY_TO](), STRUCTURE.app.workspace[KEY_PATH]],
            admin: {
                [KEY_PATH]: 'admin',
                [KEY_TO]: () => [...STRUCTURE.app.workspace[KEY_TO](), STRUCTURE.app.workspace.admin[KEY_PATH]],
                dashboard: {
                    [KEY_PATH]: 'dashboard',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.admin[KEY_TO](), STRUCTURE.app.workspace.admin.dashboard[KEY_PATH]]
                },
                lead: {
                    [KEY_PATH]: 'lead',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.admin[KEY_TO](), STRUCTURE.app.workspace.admin.lead[KEY_PATH]],
                    create: {
                        [KEY_PATH]: 'create',
                        [KEY_TO]: () => [...STRUCTURE.app.workspace.admin.lead[KEY_TO](), STRUCTURE.app.workspace.admin.lead.create[KEY_PATH]]
                    },
                    ':id': {
                        update: {
                            [KEY_PATH]: 'update',
                            [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.lead[KEY_TO](), id, STRUCTURE.app.workspace.admin.lead[':id'].update[KEY_PATH]]
                        },
                        remove: {
                            [KEY_PATH]: 'remove',
                            [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.lead[KEY_TO](), id, STRUCTURE.app.workspace.admin.lead[':id'].remove[KEY_PATH]]
                        }
                    }
                },
                deal: {
                    [KEY_PATH]: 'deal',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.admin[KEY_TO](), STRUCTURE.app.workspace.admin.deal[KEY_PATH]],
                    create: {
                        [KEY_PATH]: 'create',
                        [KEY_TO]: () => [...STRUCTURE.app.workspace.admin.deal[KEY_TO](), STRUCTURE.app.workspace.admin.deal.create[KEY_PATH]]
                    },
                    ':id': {
                        update: {
                            [KEY_PATH]: 'update',
                            [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.deal[KEY_TO](), id, STRUCTURE.app.workspace.admin.deal[':id'].update[KEY_PATH]]
                        },
                        remove: {
                            [KEY_PATH]: 'remove',
                            [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.deal[KEY_TO](), id, STRUCTURE.app.workspace.admin.deal[':id'].remove[KEY_PATH]]
                        }
                    }
                },
                setting: {
                    [KEY_PATH]: 'setting',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.admin[KEY_TO](), STRUCTURE.app.workspace.admin.setting[KEY_PATH]],
                    application: {
                        [KEY_PATH]: 'application',
                        [KEY_TO]: () => [...STRUCTURE.app.workspace.admin.setting[KEY_TO](), STRUCTURE.app.workspace.admin.setting.application[KEY_PATH]]
                    },
                    user: {
                        [KEY_PATH]: 'users',
                        [KEY_TO]: () => [...STRUCTURE.app.workspace.admin.setting[KEY_TO](), STRUCTURE.app.workspace.admin.setting.user[KEY_PATH]],
                        create: {
                            [KEY_PATH]: 'create',
                            [KEY_TO]: () => [...STRUCTURE.app.workspace.admin.setting.user[KEY_TO](), STRUCTURE.app.workspace.admin.setting.user.create[KEY_PATH]]
                        },
                        ':id': {
                            update: {
                                [KEY_PATH]: 'update',
                                [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.setting.user[KEY_TO](), id, STRUCTURE.app.workspace.admin.setting.user[':id'].update[KEY_PATH]]
                            },
                            resetPassword: {
                                [KEY_PATH]: 'reset-password',
                                [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.setting.user[KEY_TO](), id, STRUCTURE.app.workspace.admin.setting.user[':id'].resetPassword[KEY_PATH]]
                            },
                            remove: {
                                [KEY_PATH]: 'remove',
                                [KEY_TO]: ({ id }) => [...STRUCTURE.app.workspace.admin.setting.user[KEY_TO](), id, STRUCTURE.app.workspace.admin.setting.user[':id'].remove[KEY_PATH]]
                            }
                        }
                    }
                }
            },
            sale: {
                [KEY_PATH]: 'sale',
                [KEY_TO]: () => [...STRUCTURE.app.workspace[KEY_TO](), STRUCTURE.app.workspace.sale[KEY_PATH]],
                dashboard: {
                    [KEY_PATH]: 'dashboard',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.sale[KEY_TO](), STRUCTURE.app.workspace.sale.dashboard[KEY_PATH]]
                },
                lead: {
                    [KEY_PATH]: 'lead',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.sale[KEY_TO](), STRUCTURE.app.workspace.sale.lead[KEY_PATH]]
                }
            },
            project: {
                [KEY_PATH]: 'project',
                [KEY_TO]: () => [...STRUCTURE.app.workspace[KEY_TO](), STRUCTURE.app.workspace.project[KEY_PATH]],
                dashboard: {
                    [KEY_PATH]: 'dashboard',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.project[KEY_TO](), STRUCTURE.app.workspace.project.dashboard[KEY_PATH]]
                },
                deal: {
                    [KEY_PATH]: 'deal',
                    [KEY_TO]: () => [...STRUCTURE.app.workspace.project[KEY_TO](), STRUCTURE.app.workspace.project.deal[KEY_PATH]]
                }
            }
        },
        error: {
            [KEY_PATH]: 'error',
            [KEY_TO]: () => [...STRUCTURE.app[KEY_TO](), STRUCTURE.app.error[KEY_PATH]],
            boundary: {
                [KEY_PATH]: 'boundary',
                [KEY_TO]: () => [...STRUCTURE.app.error[KEY_TO](), STRUCTURE.app.error.boundary[KEY_PATH]]
            },
            forbidden: {
                [KEY_PATH]: 'forbidden',
                [KEY_TO]: () => [...STRUCTURE.app.error[KEY_TO](), STRUCTURE.app.error.forbidden[KEY_PATH]]
            },
            notFound: {
                [KEY_PATH]: 'not-found',
                [KEY_TO]: () => [...STRUCTURE.app.error[KEY_TO](), STRUCTURE.app.error.notFound[KEY_PATH]]
            }
        }
    }
}

const _getNode = (node: object): { getPath: () => string; getTo(args?: object): string } => {
    const nodeResponse = { getPath: () => '', getTo: () => '' }
    let isGetPathDone = false
    let isGetToDone = false
    for (const [key, value] of Object.entries(node)) {
        if (key === KEY_PATH && typeof value === 'string') {
            nodeResponse.getPath = (): string => `${value}/`
            isGetPathDone = true
            continue
        }
        if (key === KEY_TO && typeof value === 'function') {
            nodeResponse.getTo = (args: object = {}): string => `/${value({ ...args }).join('/')}/`
            isGetToDone = true
            continue
        }
        if (isGetPathDone && isGetToDone) {
            break
        }
    }
    return nodeResponse
}

export const route = {
    ...STRUCTURE,
    getNode: _getNode
}
