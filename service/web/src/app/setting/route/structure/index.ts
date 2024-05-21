import { TypeRouteStructure } from '../route.type.ts'
import { value } from '../route.value.ts'

export const structure: TypeRouteStructure = {
    app: {
        [value.PATH]: 'app',
        [value.TO]: () => [structure.app[value.PATH]],
        account: {
            [value.PATH]: 'account',
            [value.TO]: () => [...structure.app[value.TO](), structure.app.account[value.PATH]],
            forgot: {
                [value.PATH]: 'forgot',
                [value.TO]: () => [...structure.app.account[value.TO](), structure.app.account.forgot[value.PATH]],
            },
            login: {
                [value.PATH]: 'login',
                [value.TO]: () => [...structure.app.account[value.TO](), structure.app.account.login[value.PATH]],
            },
            logout: {
                [value.PATH]: 'logout',
                [value.TO]: () => [...structure.app.account[value.TO](), structure.app.account.logout[value.PATH]],
            },
            profile: {
                [value.PATH]: 'profile',
                [value.TO]: () => [...structure.app.account[value.TO](), structure.app.account.profile[value.PATH]],
                info: {
                    [value.PATH]: 'info',
                    [value.TO]: () => [...structure.app.account.profile[value.TO](), structure.app.account.profile.info[value.PATH]],
                },
                password: {
                    [value.PATH]: 'password',
                    [value.TO]: () => [...structure.app.account.profile[value.TO](), structure.app.account.profile.password[value.PATH]],
                },
                picture: {
                    [value.PATH]: 'picture',
                    [value.TO]: () => [...structure.app.account.profile[value.TO](), structure.app.account.profile.picture[value.PATH]],
                },
            },
        },
        workspace: {
            [value.PATH]: 'workspace',
            [value.TO]: () => [...structure.app[value.TO](), structure.app.workspace[value.PATH]],
            root: {
                [value.PATH]: 'root',
                [value.TO]: () => [...structure.app.workspace[value.TO](), structure.app.workspace.root[value.PATH]],
                dashboard: {
                    [value.PATH]: 'dashboard',
                    [value.TO]: () => [...structure.app.workspace.root[value.TO](), structure.app.workspace.root.dashboard[value.PATH]],
                },
            },
            admin: {
                [value.PATH]: 'admin',
                [value.TO]: () => [...structure.app.workspace[value.TO](), structure.app.workspace.admin[value.PATH]],
                dashboard: {
                    [value.PATH]: 'dashboard',
                    [value.TO]: () => [...structure.app.workspace.admin[value.TO](), structure.app.workspace.admin.dashboard[value.PATH]],
                },
                lead: {
                    [value.PATH]: 'lead',
                    [value.TO]: () => [...structure.app.workspace.admin[value.TO](), structure.app.workspace.admin.lead[value.PATH]],
                    create: {
                        [value.PATH]: 'create',
                        [value.TO]: () => [...structure.app.workspace.admin.lead[value.TO](), structure.app.workspace.admin.lead.create[value.PATH]],
                    },
                    ':id': {
                        update: {
                            [value.PATH]: 'update',
                            [value.TO]: ({ id }) => [...structure.app.workspace.admin.lead[value.TO](), id, structure.app.workspace.admin.lead[':id'].update[value.PATH]],
                        },
                        remove: {
                            [value.PATH]: 'remove',
                            [value.TO]: ({ id }) => [...structure.app.workspace.admin.lead[value.TO](), id, structure.app.workspace.admin.lead[':id'].remove[value.PATH]],
                        },
                    },
                },
                deal: {
                    [value.PATH]: 'deal',
                    [value.TO]: () => [...structure.app.workspace.admin[value.TO](), structure.app.workspace.admin.deal[value.PATH]],
                    create: {
                        [value.PATH]: 'create',
                        [value.TO]: () => [...structure.app.workspace.admin.deal[value.TO](), structure.app.workspace.admin.deal.create[value.PATH]],
                    },
                    ':id': {
                        update: {
                            [value.PATH]: 'update',
                            [value.TO]: ({ id }) => [...structure.app.workspace.admin.deal[value.TO](), id, structure.app.workspace.admin.deal[':id'].update[value.PATH]],
                        },
                        remove: {
                            [value.PATH]: 'remove',
                            [value.TO]: ({ id }) => [...structure.app.workspace.admin.deal[value.TO](), id, structure.app.workspace.admin.deal[':id'].remove[value.PATH]],
                        },
                    },
                },
                setting: {
                    [value.PATH]: 'setting',
                    [value.TO]: () => [...structure.app.workspace.admin[value.TO](), structure.app.workspace.admin.setting[value.PATH]],
                    application: {
                        [value.PATH]: 'application',
                        [value.TO]: () => [...structure.app.workspace.admin.setting[value.TO](), structure.app.workspace.admin.setting.application[value.PATH]],
                    },
                    user: {
                        [value.PATH]: 'users',
                        [value.TO]: () => [...structure.app.workspace.admin.setting[value.TO](), structure.app.workspace.admin.setting.user[value.PATH]],
                        create: {
                            [value.PATH]: 'create',
                            [value.TO]: () => [...structure.app.workspace.admin.setting.user[value.TO](), structure.app.workspace.admin.setting.user.create[value.PATH]],
                        },
                        ':id': {
                            update: {
                                [value.PATH]: 'update',
                                [value.TO]: ({ id }) => [...structure.app.workspace.admin.setting.user[value.TO](), id, structure.app.workspace.admin.setting.user[':id'].update[value.PATH]],
                            },
                            resetPassword: {
                                [value.PATH]: 'reset-password',
                                [value.TO]: ({ id }) => [...structure.app.workspace.admin.setting.user[value.TO](), id, structure.app.workspace.admin.setting.user[':id'].resetPassword[value.PATH]],
                            },
                            remove: {
                                [value.PATH]: 'remove',
                                [value.TO]: ({ id }) => [...structure.app.workspace.admin.setting.user[value.TO](), id, structure.app.workspace.admin.setting.user[':id'].remove[value.PATH]],
                            },
                        },
                    },
                },
            },
            sale: {
                [value.PATH]: 'sale',
                [value.TO]: () => [...structure.app.workspace[value.TO](), structure.app.workspace.sale[value.PATH]],
                dashboard: {
                    [value.PATH]: 'dashboard',
                    [value.TO]: () => [...structure.app.workspace.sale[value.TO](), structure.app.workspace.sale.dashboard[value.PATH]],
                },
                lead: {
                    [value.PATH]: 'lead',
                    [value.TO]: () => [...structure.app.workspace.sale[value.TO](), structure.app.workspace.sale.lead[value.PATH]],
                },
            },
            project: {
                [value.PATH]: 'project',
                [value.TO]: () => [...structure.app.workspace[value.TO](), structure.app.workspace.project[value.PATH]],
                dashboard: {
                    [value.PATH]: 'dashboard',
                    [value.TO]: () => [...structure.app.workspace.project[value.TO](), structure.app.workspace.project.dashboard[value.PATH]],
                },
                deal: {
                    [value.PATH]: 'deal',
                    [value.TO]: () => [...structure.app.workspace.project[value.TO](), structure.app.workspace.project.deal[value.PATH]],
                },
            },
        },
        error: {
            [value.PATH]: 'error',
            [value.TO]: () => [...structure.app[value.TO](), structure.app.error[value.PATH]],
            boundary: {
                [value.PATH]: 'boundary',
                [value.TO]: () => [...structure.app.error[value.TO](), structure.app.error.boundary[value.PATH]],
            },
            forbidden: {
                [value.PATH]: 'forbidden',
                [value.TO]: () => [...structure.app.error[value.TO](), structure.app.error.forbidden[value.PATH]],
            },
            notFound: {
                [value.PATH]: 'not-found',
                [value.TO]: () => [...structure.app.error[value.TO](), structure.app.error.notFound[value.PATH]],
            },
        },
    },
}
