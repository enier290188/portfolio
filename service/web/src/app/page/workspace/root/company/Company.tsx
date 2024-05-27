import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import { tableType } from '@./package/tanstack-react-table'
import React from 'react'

const RouteCreate = React.lazy(() => import('./create'))
const RouteIdUpdate = React.lazy(() => import('./id/update'))
const RouteIdRemove = React.lazy(() => import('./id/remove'))

type TypeLead = {
    id: string
    name: string
    email: string
    phone: string
    createdAt: string
    updatedAt: string
}

const ViewList = React.memo(() => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.admin.lead, i18nLanguage), [i18nLanguage])

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userId = user?.id ?? ''

    const queryLeadList = query.hook.useQuery({
        queryKey: [`/app/page/workspace/admin/lead/list/`, 'query', 'db'],
        queryFn: () => [],
        initialData: [],
    })

    const handleActionRefresh = React.useCallback(async () => {
        await queryLeadList.refetch()
    }, [queryLeadList])

    const tableColumns = React.useMemo<tableType.ColumnDef<TypeLead>[]>(
        () => [
            {
                accessorKey: app.component.crud.TableColumnAccessorKeyAction,
                header: () => (
                    <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead.create).getTo()} space={0} typographyProps={{ variant: 'body2' }}>
                        <mui.icon.AddCircle sx={{ m: `0 !important` }} />
                    </app.component.button.ButtonLink>
                ),
                cell: ({ row }) => (
                    <>
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead[':id'].update).getTo({ id: row.id })} space={{ top: 0, right: 1, bottom: 0, left: 0 }} typographyProps={{ variant: 'body2' }}>
                            <mui.icon.Edit sx={{ m: `0 !important` }} />
                        </app.component.button.ButtonLink>
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead[':id'].remove).getTo({ id: row.id })} space={{ top: 0, right: 2, bottom: 0, left: 0 }} typographyProps={{ variant: 'body2' }}>
                            <mui.icon.DeleteForever sx={{ m: `0 !important` }} />
                        </app.component.button.ButtonLink>
                        {row.getCanExpand() ? (
                            <app.component.button.Button variant={'text'} space={0} onClick={row.getToggleExpandedHandler()} typographyProps={{ variant: 'body1' }}>
                                {row.getIsExpanded() ? <mui.icon.KeyboardArrowDown sx={{ m: `0 !important` }} /> : <mui.icon.KeyboardArrowRight sx={{ m: `0 !important` }} />}
                            </app.component.button.Button>
                        ) : null}
                    </>
                ),
                enableSorting: false,
                enableColumnFilter: false,
                meta: {
                    width: 184,
                },
            },
            {
                accessorKey: 'name',
                header: i18n.getText('field.name.label'),
                enableSorting: true,
                enableColumnFilter: true,
                sortingFn: 'alphanumericCaseSensitive',
                filterFn: 'includesString',
                meta: {
                    type: 'text',
                },
            },
            {
                accessorKey: 'email',
                header: i18n.getText('field.email.label'),
                enableSorting: true,
                enableColumnFilter: true,
                sortingFn: 'alphanumericCaseSensitive',
                filterFn: 'includesString',
                meta: {
                    type: 'email',
                },
            },
            {
                accessorKey: 'phone',
                header: i18n.getText('field.phone.label'),
                enableSorting: true,
                enableColumnFilter: true,
                sortingFn: 'alphanumericCaseSensitive',
                filterFn: 'includesString',
                meta: {
                    type: 'phone',
                },
            },
            {
                accessorKey: 'createdAt',
                header: i18n.getText('field.created-at.label'),
                enableSorting: true,
                enableColumnFilter: false,
                sortingFn: 'datetime',
                meta: {
                    type: 'datetime',
                    width: 180,
                    expander: true,
                },
            },
            {
                accessorKey: 'updatedAt',
                header: i18n.getText('field.updated-at.label'),
                enableSorting: true,
                enableColumnFilter: false,
                sortingFn: 'datetime',
                meta: {
                    type: 'datetime',
                    width: 180,
                    expander: true,
                },
            },
        ],
        [i18n],
    )

    const tableData: TypeLead[] = queryLeadList.data.slice()

    return (
        <app.layout.main.component.structure.page.Page maxWidth={'lg'}>
            <app.layout.main.component.structure.head.spaceBetween.Head>
                <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.box.title.Title level={1}>
                        <mui.icon.BusinessCenter />
                        {i18n.getText('title')}
                    </app.layout.main.component.structure.box.title.Title>
                </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                    <app.component.button.Button space={1} disabled={queryLeadList.isFetching} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                        {queryLeadList.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                        {i18n.getText('action.refresh')}
                    </app.component.button.Button>
                </app.layout.main.component.structure.head.spaceBetween.HeadRight>
            </app.layout.main.component.structure.head.spaceBetween.Head>
            {queryLeadList.isFetching ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
            <app.layout.main.component.structure.body.Body>
                <app.layout.main.component.structure.box.content.Content>{queryLeadList.isFetching ? <app.component.loading.Text /> : <app.component.crud.Table tableKey={`${userId}-page-workspace-admin-lead-list`} columns={tableColumns} data={tableData} />}</app.layout.main.component.structure.box.content.Content>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    )
})
ViewList.displayName = 'ViewList'

export const Company = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<ViewList />} />
                <router.component.Route
                    path={`${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead.create).getPath()}*`}
                    element={
                        <>
                            <ViewList />
                            <React.Suspense fallback={null}>
                                <RouteCreate />
                            </React.Suspense>
                        </>
                    }
                />
                <router.component.Route
                    path={`:id/${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead[':id'].update).getPath()}*`}
                    element={
                        <>
                            <ViewList />
                            <React.Suspense fallback={null}>
                                <RouteIdUpdate />
                            </React.Suspense>
                        </>
                    }
                />
                <router.component.Route
                    path={`:id/${app.setting.route.getNode(app.setting.route.app.page.workspace.admin.lead[':id'].remove).getPath()}*`}
                    element={
                        <>
                            <ViewList />
                            <React.Suspense fallback={null}>
                                <RouteIdRemove />
                            </React.Suspense>
                        </>
                    }
                />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
