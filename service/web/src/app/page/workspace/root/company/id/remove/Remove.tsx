import { app, appServiceApiPageWorkspaceRootType, appType } from '@./app'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeForm = {
    name: string
    email: string
    phone: string
    isActive: boolean
}

const DEFAULT_VALUES: TypeForm = {
    name: '',
    email: '',
    phone: '',
    isActive: false,
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.root.company.id.remove, i18nLanguage), [i18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)
    const alertActionAddAlert = contextAlert.addAlert

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getAccessToken()
    const accessTokenActionUpdateAccessToken = contextAccessToken.updateAccessToken

    const contextUser = React.useContext(app.context.user.Context)
    const userActionSyncUser = contextUser.syncUser

    const { id } = router.hook.useParams()
    const paramCompanyId = id ?? ''

    const queryClient = query.hook.useQueryClient()
    const queryCompanyGet = query.hook.useQuery({
        queryKey: [`/app/page/workspace/root/company/${paramCompanyId}/get/`, 'query', 'db'],
        queryFn: async (): Promise<null | appType.TypeServiceApiPageWorkspaceRootCompanyResponse> => {
            const response = await app.service.api.page.workspace.root.company_get({ accessToken: accessToken, id: paramCompanyId })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                if (response.data?.item) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return response.data.item
                } else {
                    return null
                }
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.fetch.alert.error') })
                return null
            }
        },
        initialData: null,
    })
    const mutationCompanyRemove = query.hook.useMutation({
        mutationKey: [`/app/page/workspace/root/company/${paramCompanyId}/remove/`, 'mutation', 'db'],
        mutationFn: async (company: appServiceApiPageWorkspaceRootType.TypeCompanyRemoveRequest['company']): Promise<null | appType.TypeServiceApiPageWorkspaceRootCompanyResponse> => {
            const response = await app.service.api.page.workspace.root.company_remove({ accessToken: accessToken, company: company })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                if (response.data?.item) {
                    queryClient.setQueryData([`/app/page/workspace/root/company/${paramCompanyId}/get/`, 'query', 'db'], null)
                    queryClient.setQueryData([`/app/page/workspace/root/company/list/`, 'query', 'db'], (companyList: appType.TypeServiceApiPageWorkspaceRootCompanyResponse[]) => companyList.filter((companyMap) => companyMap.id !== company.id))
                    alertActionAddAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return response.data.item
                } else {
                    return null
                }
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                return null
            }
        },
    })

    const formRemove = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const handleActionRefresh = React.useCallback(async () => {
        setEffectStep(EFFECT_STEP.FETCHING)
        await queryCompanyGet.refetch()
    }, [queryCompanyGet])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (_data: TypeForm) => {
            mutationCompanyRemove.mutate({
                id: paramCompanyId,
            })
        },
        [paramCompanyId, mutationCompanyRemove],
    )

    const effectStepFetching = React.useCallback(async () => {
        if (!queryCompanyGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryCompanyGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const name = queryCompanyGet.data?.name ?? DEFAULT_VALUES.name
        const email = queryCompanyGet.data?.email ?? DEFAULT_VALUES.email
        const phone = queryCompanyGet.data?.phone ?? DEFAULT_VALUES.phone
        const isActive = queryCompanyGet.data?.is_active ?? DEFAULT_VALUES.isActive
        formRemove.setValue('name', name)
        formRemove.setValue('email', email)
        formRemove.setValue('phone', phone)
        formRemove.setValue('isActive', isActive)
        await formRemove.trigger()
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [queryCompanyGet.data, formRemove])

    React.useEffect(() => {
        switch (effectStep) {
            case EFFECT_STEP.FETCHING:
                effectStepFetching()
                    .then(() => null)
                    .catch(() => null)
                break
            case EFFECT_STEP.FILLING:
                effectStepFilling()
                    .then(() => null)
                    .catch(() => null)
                break
            default:
                break
        }
    }, [effectStep, effectStepFetching, effectStepFilling])

    if (mutationCompanyRemove.data) {
        return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.page.workspace.root.company).getTo()} />
    }

    if (!queryCompanyGet.isFetching && !queryCompanyGet.data) {
        return <app.component.navigate.ToAppErrorNotFound />
    }

    return (
        <app.component.dialog.Dialog>
            <app.layout.main.component.structure.page.Page maxWidth={'sm'}>
                {queryCompanyGet.isFetching || mutationCompanyRemove.isPending || formRemove.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
                <app.layout.main.component.structure.head.spaceBetween.Head>
                    <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                        <app.layout.main.component.structure.box.title.Title level={1}>
                            <mui.icon.DeleteForever />
                            {i18n.getText('title')}
                        </app.layout.main.component.structure.box.title.Title>
                    </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                        <app.component.button.Button space={1} disabled={queryCompanyGet.isFetching || mutationCompanyRemove.isPending || formRemove.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                            {queryCompanyGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                            {i18n.getText('action.refresh')}
                        </app.component.button.Button>
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.page.workspace.root.company).getTo()} variant={'contained'} space={1} disabled={queryCompanyGet.isFetching || mutationCompanyRemove.isPending || formRemove.formState.isSubmitting} typographyProps={{ variant: 'body2' }}>
                            <mui.icon.Close sx={{ m: `0 !important` }} />
                        </app.component.button.ButtonLink>
                    </app.layout.main.component.structure.head.spaceBetween.HeadRight>
                </app.layout.main.component.structure.head.spaceBetween.Head>
                {queryCompanyGet.isFetching ? (
                    <>
                        <app.component.loading.ProgressLinear />
                        <app.layout.main.component.structure.body.Body>
                            <app.layout.main.component.structure.box.content.Content>
                                <app.component.loading.Text />
                            </app.layout.main.component.structure.box.content.Content>
                        </app.layout.main.component.structure.body.Body>
                    </>
                ) : (
                    <>
                        <app.component.divider.Divider />
                        <app.layout.main.component.structure.body.Body alignItems={'center'}>
                            <mui.component.Box component={'form'} width={'100%'} maxWidth={'375px'} my={4} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                                <app.layout.main.component.structure.box.content.Content>
                                    <app.component.alert.Alert
                                        space={{
                                            top: 2,
                                            right: 1,
                                            bottom: 2,
                                            left: 1,
                                        }}
                                        variant={'standard'}
                                        severity={'warning'}
                                    >
                                        {i18n.getText('question.alert')}
                                    </app.component.alert.Alert>
                                </app.layout.main.component.structure.box.content.Content>
                                <app.layout.main.component.structure.box.content.Content>
                                    <form.component.Controller
                                        name={'name'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.text.Text
                                                type={'text'}
                                                required={false}
                                                InputProps={{
                                                    startAdornment: (
                                                        <mui.component.InputAdornment position={'start'}>
                                                            <mui.icon.Description />
                                                        </mui.component.InputAdornment>
                                                    ),
                                                }}
                                                label={i18n.getText('field.name.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                    <form.component.Controller
                                        name={'email'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.text.TextEmail
                                                required={false}
                                                label={i18n.getText('field.email.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                    <form.component.Controller
                                        name={'phone'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.text.TextPhone
                                                required={false}
                                                label={i18n.getText('field.phone.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                    <form.component.Controller
                                        name={'isActive'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.checkbox.Checkbox
                                                required={true}
                                                label={i18n.getText('field.is-active.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                </app.layout.main.component.structure.box.content.Content>
                                {mutationCompanyRemove.isPending || formRemove.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                                <app.layout.main.component.structure.box.action.Action>
                                    <app.component.button.ButtonSubmit space={1} color={'warning'} disabled={mutationCompanyRemove.isPending || formRemove.formState.isSubmitting || formRemove.formState.isValidating || !formRemove.formState.isValid} onClick={formRemove.handleSubmit(handleActionSubmit)}>
                                        {mutationCompanyRemove.isPending || formRemove.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.DoneOutline />}
                                        {i18n.getText('action.submit')}
                                    </app.component.button.ButtonSubmit>
                                </app.layout.main.component.structure.box.action.Action>
                            </mui.component.Box>
                        </app.layout.main.component.structure.body.Body>
                    </>
                )}
            </app.layout.main.component.structure.page.Page>
        </app.component.dialog.Dialog>
    )
}

export const Remove = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
