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
    isActive: true,
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.root.company.id.update, i18nLanguage), [i18nLanguage])

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
        queryKey: [`/app/page/workspace/root/company/${paramCompanyId}/get`, 'query', 'db'],
        queryFn: async (): Promise<null | appType.TypeServiceApiPageWorkspaceRootCompanyResponse> => {
            const response = await app.service.api.page.workspace.root.company_get({ accessToken: accessToken, id: paramCompanyId })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return response.data?.item ?? null
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.fetch.alert.error') })
                return null
            }
        },
        initialData: null,
    })
    const mutationCompanyUpdate = query.hook.useMutation({
        mutationKey: [`/app/page/workspace/root/company/${paramCompanyId}/update/`, 'mutation', 'db'],
        mutationFn: async (company: appServiceApiPageWorkspaceRootType.TypeCompanyUpdateRequest['company']): Promise<null | appType.TypeServiceApiPageWorkspaceRootCompanyResponse> => {
            const response = await app.service.api.page.workspace.root.company_update({ accessToken: accessToken, company: company })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                queryClient.setQueryData([`/app/page/workspace/root/company/${paramCompanyId}/get`, 'query', 'db'], response.data?.item ?? null)
                queryClient.setQueryData([`/app/page/workspace/root/company/list/`, 'query', 'db'], (companyList: appType.TypeServiceApiPageWorkspaceRootCompanyResponse[]) => companyList.map((companyMap) => (companyMap.id === company.id ? response.data?.item ?? null : companyMap)))
                alertActionAddAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return response.data?.item ?? null
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                return null
            }
        },
    })

    const formUpdate = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [defaultValuesToReset, setDefaultValuesToReset] = React.useState<TypeForm>(DEFAULT_VALUES)
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const handleValidateFieldName = React.useCallback(
        (value: TypeForm['name']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.name.validate.required'))
            }
            if (32 < value.length) {
                messageList.push(i18n.getText('field.name.validate.max-length', { value: 32 }))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldEmail = React.useCallback(
        (value: TypeForm['email']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.email.validate.required'))
            }
            if (128 < value.length) {
                messageList.push(i18n.getText('field.email.validate.max-length', { value: 128 }))
            }
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                messageList.push(i18n.getText('field.email.validate.pattern'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldPhone = React.useCallback(
        (value: TypeForm['phone']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.phone.validate.required'))
            }
            if (10 < value.length) {
                messageList.push(i18n.getText('field.phone.validate.max-length', { value: 10 }))
            }
            if (!/^(\d{10})$/.test(value)) {
                messageList.push(i18n.getText('field.phone.validate.pattern'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleActionRefresh = React.useCallback(async () => {
        setEffectStep(EFFECT_STEP.FETCHING)
        await queryCompanyGet.refetch()
    }, [queryCompanyGet])

    const handleActionReset = React.useCallback(async () => {
        formUpdate.setValue('name', defaultValuesToReset.name)
        formUpdate.setValue('email', defaultValuesToReset.email)
        formUpdate.setValue('phone', defaultValuesToReset.phone)
        await formUpdate.trigger()
    }, [formUpdate, defaultValuesToReset])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        async (data: TypeForm) => {
            const { name, email, phone, isActive } = data

            mutationCompanyUpdate.mutate(
                {
                    id: paramCompanyId,
                    name: name,
                    email: email,
                    phone: phone,
                    is_active: isActive,
                },
                {
                    onSuccess: (companyUpdated) => {
                        if (companyUpdated) {
                            setDefaultValuesToReset((oldState) => ({
                                ...oldState,
                                name: name,
                                email: email,
                                phone: phone,
                                isActive: isActive,
                            }))
                        }
                    },
                },
            )
        },
        [paramCompanyId, mutationCompanyUpdate],
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
        setDefaultValuesToReset((oldState) => ({
            ...oldState,
            name: name,
            email: email,
            phone: phone,
            isActive: isActive,
        }))
        formUpdate.setValue('name', name)
        formUpdate.setValue('email', email)
        formUpdate.setValue('phone', phone)
        formUpdate.setValue('isActive', isActive)
        await formUpdate.trigger()
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [queryCompanyGet.data, formUpdate])

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

    if (!queryCompanyGet.isFetching && !queryCompanyGet.data) {
        return <app.component.navigate.ToAppErrorNotFound />
    }

    return (
        <app.component.dialog.Dialog>
            <app.layout.main.component.structure.page.Page maxWidth={'sm'}>
                {queryCompanyGet.isFetching || mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
                <app.layout.main.component.structure.head.spaceBetween.Head>
                    <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                        <app.layout.main.component.structure.box.title.Title level={1}>
                            <mui.icon.Edit />
                            {i18n.getText('title')}
                        </app.layout.main.component.structure.box.title.Title>
                    </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                        <app.component.button.Button space={1} disabled={queryCompanyGet.isFetching || mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                            {queryCompanyGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                            {i18n.getText('action.refresh')}
                        </app.component.button.Button>
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.page.workspace.root.company).getTo()} variant={'contained'} space={1} disabled={queryCompanyGet.isFetching || mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting} typographyProps={{ variant: 'body2' }}>
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
                                    <form.component.Controller
                                        name={'name'}
                                        control={formUpdate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldName,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.text.Text
                                                type={'text'}
                                                required={true}
                                                InputProps={{
                                                    startAdornment: (
                                                        <mui.component.InputAdornment position={'start'}>
                                                            <mui.icon.Description />
                                                        </mui.component.InputAdornment>
                                                    ),
                                                }}
                                                label={i18n.getText('field.name.label')}
                                                error={!!formUpdate.formState.errors.name}
                                                helperText={formUpdate.formState.errors.name?.message}
                                                disabled={mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting}
                                                autoFocus={true}
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
                                        control={formUpdate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldEmail,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.text.TextEmail
                                                required={true}
                                                label={i18n.getText('field.email.label')}
                                                error={!!formUpdate.formState.errors.email}
                                                helperText={formUpdate.formState.errors.email?.message}
                                                disabled={mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting}
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
                                        control={formUpdate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldPhone,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.text.TextPhone
                                                required={true}
                                                label={i18n.getText('field.phone.label')}
                                                error={!!formUpdate.formState.errors.phone}
                                                helperText={formUpdate.formState.errors.phone?.message}
                                                disabled={mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting}
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
                                {mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                                <app.layout.main.component.structure.box.action.Action>
                                    <app.component.button.ButtonSubmit space={1} disabled={mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting || formUpdate.formState.isValidating || !formUpdate.formState.isValid} onClick={formUpdate.handleSubmit(handleActionSubmit)}>
                                        {mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Save />}
                                        {i18n.getText('action.submit')}
                                    </app.component.button.ButtonSubmit>
                                    <app.component.button.Button space={1} disabled={mutationCompanyUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionReset}>
                                        {formUpdate.formState.isValidating ? <app.component.loading.ProgressCircular /> : <mui.icon.Restore />}
                                        {i18n.getText('action.reset')}
                                    </app.component.button.Button>
                                </app.layout.main.component.structure.box.action.Action>
                            </mui.component.Box>
                        </app.layout.main.component.structure.body.Body>
                    </>
                )}
            </app.layout.main.component.structure.page.Page>
        </app.component.dialog.Dialog>
    )
}

export const Update = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
