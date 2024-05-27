import { TypeRouteStructure } from '../route.type.ts'
import { value } from '../route.value.ts'

export const structure: TypeRouteStructure = {
    app: {
        [value.PATH]: 'app',
        [value.TO]: () => [structure.app[value.PATH]],
        page: {
            [value.PATH]: 'page',
            [value.TO]: () => [...structure.app[value.TO](), structure.app.page[value.PATH]],
            account: {
                [value.PATH]: 'account',
                [value.TO]: () => [...structure.app.page[value.TO](), structure.app.page.account[value.PATH]],
                forgot: {
                    [value.PATH]: 'forgot',
                    [value.TO]: () => [...structure.app.page.account[value.TO](), structure.app.page.account.forgot[value.PATH]],
                },
                login: {
                    [value.PATH]: 'login',
                    [value.TO]: () => [...structure.app.page.account[value.TO](), structure.app.page.account.login[value.PATH]],
                },
                logout: {
                    [value.PATH]: 'logout',
                    [value.TO]: () => [...structure.app.page.account[value.TO](), structure.app.page.account.logout[value.PATH]],
                },
                profile: {
                    [value.PATH]: 'profile',
                    [value.TO]: () => [...structure.app.page.account[value.TO](), structure.app.page.account.profile[value.PATH]],
                    info: {
                        [value.PATH]: 'info',
                        [value.TO]: () => [...structure.app.page.account.profile[value.TO](), structure.app.page.account.profile.info[value.PATH]],
                    },
                    password: {
                        [value.PATH]: 'password',
                        [value.TO]: () => [...structure.app.page.account.profile[value.TO](), structure.app.page.account.profile.password[value.PATH]],
                    },
                    picture: {
                        [value.PATH]: 'picture',
                        [value.TO]: () => [...structure.app.page.account.profile[value.TO](), structure.app.page.account.profile.picture[value.PATH]],
                    },
                },
            },
            workspace: {
                [value.PATH]: 'workspace',
                [value.TO]: () => [...structure.app.page[value.TO](), structure.app.page.workspace[value.PATH]],
                root: {
                    [value.PATH]: 'root',
                    [value.TO]: () => [...structure.app.page.workspace[value.TO](), structure.app.page.workspace.root[value.PATH]],
                    dashboard: {
                        [value.PATH]: 'dashboard',
                        [value.TO]: () => [...structure.app.page.workspace.root[value.TO](), structure.app.page.workspace.root.dashboard[value.PATH]],
                    },
                    company: {
                        [value.PATH]: 'company',
                        [value.TO]: () => [...structure.app.page.workspace.root[value.TO](), structure.app.page.workspace.root.company[value.PATH]],
                        create: {
                            [value.PATH]: 'create',
                            [value.TO]: () => [...structure.app.page.workspace.root.company[value.TO](), structure.app.page.workspace.root.company.create[value.PATH]],
                        },
                        ':id': {
                            update: {
                                [value.PATH]: 'update',
                                [value.TO]: ({ id }) => [...structure.app.page.workspace.root.company[value.TO](), id, structure.app.page.workspace.root.company[':id'].update[value.PATH]],
                            },
                            remove: {
                                [value.PATH]: 'remove',
                                [value.TO]: ({ id }) => [...structure.app.page.workspace.root.company[value.TO](), id, structure.app.page.workspace.root.company[':id'].remove[value.PATH]],
                            },
                        },
                    },
                },
                admin: {
                    [value.PATH]: 'admin',
                    [value.TO]: () => [...structure.app.page.workspace[value.TO](), structure.app.page.workspace.admin[value.PATH]],
                    dashboard: {
                        [value.PATH]: 'dashboard',
                        [value.TO]: () => [...structure.app.page.workspace.admin[value.TO](), structure.app.page.workspace.admin.dashboard[value.PATH]],
                    },
                    lead: {
                        [value.PATH]: 'lead',
                        [value.TO]: () => [...structure.app.page.workspace.admin[value.TO](), structure.app.page.workspace.admin.lead[value.PATH]],
                        create: {
                            [value.PATH]: 'create',
                            [value.TO]: () => [...structure.app.page.workspace.admin.lead[value.TO](), structure.app.page.workspace.admin.lead.create[value.PATH]],
                        },
                        ':id': {
                            update: {
                                [value.PATH]: 'update',
                                [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.lead[value.TO](), id, structure.app.page.workspace.admin.lead[':id'].update[value.PATH]],
                            },
                            remove: {
                                [value.PATH]: 'remove',
                                [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.lead[value.TO](), id, structure.app.page.workspace.admin.lead[':id'].remove[value.PATH]],
                            },
                        },
                    },
                    deal: {
                        [value.PATH]: 'deal',
                        [value.TO]: () => [...structure.app.page.workspace.admin[value.TO](), structure.app.page.workspace.admin.deal[value.PATH]],
                        create: {
                            [value.PATH]: 'create',
                            [value.TO]: () => [...structure.app.page.workspace.admin.deal[value.TO](), structure.app.page.workspace.admin.deal.create[value.PATH]],
                        },
                        ':id': {
                            update: {
                                [value.PATH]: 'update',
                                [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.deal[value.TO](), id, structure.app.page.workspace.admin.deal[':id'].update[value.PATH]],
                            },
                            remove: {
                                [value.PATH]: 'remove',
                                [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.deal[value.TO](), id, structure.app.page.workspace.admin.deal[':id'].remove[value.PATH]],
                            },
                        },
                    },
                    setting: {
                        [value.PATH]: 'setting',
                        [value.TO]: () => [...structure.app.page.workspace.admin[value.TO](), structure.app.page.workspace.admin.setting[value.PATH]],
                        application: {
                            [value.PATH]: 'application',
                            [value.TO]: () => [...structure.app.page.workspace.admin.setting[value.TO](), structure.app.page.workspace.admin.setting.application[value.PATH]],
                        },
                        user: {
                            [value.PATH]: 'users',
                            [value.TO]: () => [...structure.app.page.workspace.admin.setting[value.TO](), structure.app.page.workspace.admin.setting.user[value.PATH]],
                            create: {
                                [value.PATH]: 'create',
                                [value.TO]: () => [...structure.app.page.workspace.admin.setting.user[value.TO](), structure.app.page.workspace.admin.setting.user.create[value.PATH]],
                            },
                            ':id': {
                                update: {
                                    [value.PATH]: 'update',
                                    [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.setting.user[value.TO](), id, structure.app.page.workspace.admin.setting.user[':id'].update[value.PATH]],
                                },
                                resetPassword: {
                                    [value.PATH]: 'reset-password',
                                    [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.setting.user[value.TO](), id, structure.app.page.workspace.admin.setting.user[':id'].resetPassword[value.PATH]],
                                },
                                remove: {
                                    [value.PATH]: 'remove',
                                    [value.TO]: ({ id }) => [...structure.app.page.workspace.admin.setting.user[value.TO](), id, structure.app.page.workspace.admin.setting.user[':id'].remove[value.PATH]],
                                },
                            },
                        },
                    },
                },
                sale: {
                    [value.PATH]: 'sale',
                    [value.TO]: () => [...structure.app.page.workspace[value.TO](), structure.app.page.workspace.sale[value.PATH]],
                    dashboard: {
                        [value.PATH]: 'dashboard',
                        [value.TO]: () => [...structure.app.page.workspace.sale[value.TO](), structure.app.page.workspace.sale.dashboard[value.PATH]],
                    },
                    lead: {
                        [value.PATH]: 'lead',
                        [value.TO]: () => [...structure.app.page.workspace.sale[value.TO](), structure.app.page.workspace.sale.lead[value.PATH]],
                    },
                },
                project: {
                    [value.PATH]: 'project',
                    [value.TO]: () => [...structure.app.page.workspace[value.TO](), structure.app.page.workspace.project[value.PATH]],
                    dashboard: {
                        [value.PATH]: 'dashboard',
                        [value.TO]: () => [...structure.app.page.workspace.project[value.TO](), structure.app.page.workspace.project.dashboard[value.PATH]],
                    },
                    deal: {
                        [value.PATH]: 'deal',
                        [value.TO]: () => [...structure.app.page.workspace.project[value.TO](), structure.app.page.workspace.project.deal[value.PATH]],
                    },
                },
            },
            error: {
                [value.PATH]: 'error',
                [value.TO]: () => [...structure.app.page[value.TO](), structure.app.page.error[value.PATH]],
                boundary: {
                    [value.PATH]: 'boundary',
                    [value.TO]: () => [...structure.app.page.error[value.TO](), structure.app.page.error.boundary[value.PATH]],
                },
                forbidden: {
                    [value.PATH]: 'forbidden',
                    [value.TO]: () => [...structure.app.page.error[value.TO](), structure.app.page.error.forbidden[value.PATH]],
                },
                notFound: {
                    [value.PATH]: 'not-found',
                    [value.TO]: () => [...structure.app.page.error[value.TO](), structure.app.page.error.notFound[value.PATH]],
                },
            },
        },
    },
}
