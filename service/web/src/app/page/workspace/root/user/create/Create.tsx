import { app, appServiceApiPageWorkspaceRootType, appType } from '@./app'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeForm = {
    companyId: null | string
    name: string
    email: string
    phone: string
    isActive: boolean
    hasPermissionOfRoot: boolean
    hasPermissionOfAdmin: boolean
    hasPermissionOfSale: boolean
    hasPermissionOfProject: boolean
}

const DEFAULT_VALUES: TypeForm = {
    companyId: null,
    name: '',
    email: '',
    phone: '',
    isActive: false,
    hasPermissionOfRoot: false,
    hasPermissionOfAdmin: false,
    hasPermissionOfSale: false,
    hasPermissionOfProject: false,
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.root.user.create, i18nLanguage), [i18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)
    const alertActionAddAlert = contextAlert.addAlert

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getAccessToken()
    const accessTokenActionUpdateAccessToken = contextAccessToken.updateAccessToken

    const contextUser = React.useContext(app.context.user.Context)
    const userActionSyncUser = contextUser.syncUser

    const queryCompanyList = query.hook.useQuery({
        queryKey: [`/app/page/workspace/root/company/list/`, 'query', 'db'],
        queryFn: async (): Promise<appType.TypeServiceApiPageWorkspaceRootCompanyResponse[]> => {
            const response = await app.service.api.page.workspace.root.company_fetch({ accessToken: accessToken })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                if (response.data?.items) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return response.data.items
                } else {
                    return []
                }
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.fetch.alert.error') })
                return []
            }
        },
        initialData: [],
    })

    const queryClient = query.hook.useQueryClient()
    const queryUserGet = query.hook.useQuery({
        queryKey: [`/app/page/workspace/root/user/create/`, 'query', 'db'],
        queryFn: async (): Promise<null | appType.TypeServiceApiPageWorkspaceRootUserResponse> => null,
        initialData: null,
    })
    const mutationUserCreate = query.hook.useMutation({
        mutationKey: [`/app/page/workspace/root/user/create/`, 'mutation', 'db'],
        mutationFn: async (user: appServiceApiPageWorkspaceRootType.TypeUserCreateRequest['user']): Promise<null | appType.TypeServiceApiPageWorkspaceRootUserResponse> => {
            const response = await app.service.api.page.workspace.root.user_create({ accessToken: accessToken, user: user })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                if (response.data?.item) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    queryClient.setQueryData([`/app/page/workspace/root/user/${response.data.item.id}/get/`, 'query', 'db'], response.data.item)
                    queryClient.setQueryData([`/app/page/workspace/root/user/list/`, 'query', 'db'], (userList: appType.TypeServiceApiPageWorkspaceRootUserResponse[]) => [...userList, response.data.item])
                    alertActionAddAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return response.data.item
                } else {
                    return null
                }
            } else {
                if (response.data.detail.error === 'EmailAlreadyExists') {
                    alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error.EmailAlreadyExists') })
                } else {
                    alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                }
                return null
            }
        },
    })

    const formCreate = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [defaultValuesToReset, setDefaultValuesToReset] = React.useState<TypeForm>(DEFAULT_VALUES)
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const watchFieldCompanyId = formCreate.watch('companyId')

    const autocompleteSelectedFieldCompanyId = React.useMemo(
        () =>
            watchFieldCompanyId
                ? {
                      id: watchFieldCompanyId,
                      label: '',
                  }
                : null,
        [watchFieldCompanyId],
    )
    const autocompleteOptionsFieldCompanyId = React.useMemo(
        () =>
            queryCompanyList.data.map((companyMap) => {
                if (autocompleteSelectedFieldCompanyId?.id === companyMap.id) {
                    autocompleteSelectedFieldCompanyId.label = companyMap.name
                }
                return {
                    id: companyMap.id,
                    label: companyMap.name,
                }
            }),
        [queryCompanyList.data, autocompleteSelectedFieldCompanyId],
    )
    const autocompleteOnChangeFieldCompanyId = React.useCallback(
        async (value: typeof autocompleteSelectedFieldCompanyId) => {
            formCreate.setValue('companyId', value?.id ?? null)
            await formCreate.trigger(['companyId'])
        },
        [formCreate],
    )

    const handleValidateFieldCompanyId = React.useCallback(
        (value: TypeForm['companyId']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.company-id.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

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
            if (0 < value.length) {
                if (10 < value.length) {
                    messageList.push(i18n.getText('field.phone.validate.max-length', { value: 10 }))
                }
                if (!/^(\d{10})$/.test(value)) {
                    messageList.push(i18n.getText('field.phone.validate.pattern'))
                }
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldIsActive = React.useCallback(
        (value: TypeForm['isActive']) => {
            const messageList: string[] = []
            if (!(value === true || value === false)) {
                messageList.push(i18n.getText('field.is-active.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldHasPermissionOfRoot = React.useCallback(
        (value: TypeForm['hasPermissionOfRoot']) => {
            const messageList: string[] = []
            if (!(value === true || value === false)) {
                messageList.push(i18n.getText('field.has-permission-of-root.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldHasPermissionOfAdmin = React.useCallback(
        (value: TypeForm['hasPermissionOfAdmin']) => {
            const messageList: string[] = []
            if (!(value === true || value === false)) {
                messageList.push(i18n.getText('field.has-permission-of-admin.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldHasPermissionOfSale = React.useCallback(
        (value: TypeForm['hasPermissionOfSale']) => {
            const messageList: string[] = []
            if (!(value === true || value === false)) {
                messageList.push(i18n.getText('field.has-permission-of-sale.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldHasPermissionOfProject = React.useCallback(
        (value: TypeForm['hasPermissionOfProject']) => {
            const messageList: string[] = []
            if (!(value === true || value === false)) {
                messageList.push(i18n.getText('field.has-permission-of-project.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleActionRefresh = React.useCallback(async () => {
        setEffectStep(EFFECT_STEP.FETCHING)
        await queryUserGet.refetch()
    }, [queryUserGet])

    const handleActionReset = React.useCallback(async () => {
        formCreate.setValue('companyId', defaultValuesToReset.companyId)
        formCreate.setValue('name', defaultValuesToReset.name)
        formCreate.setValue('email', defaultValuesToReset.email)
        formCreate.setValue('phone', defaultValuesToReset.phone)
        formCreate.setValue('isActive', defaultValuesToReset.isActive)
        formCreate.setValue('hasPermissionOfRoot', defaultValuesToReset.hasPermissionOfRoot)
        formCreate.setValue('hasPermissionOfAdmin', defaultValuesToReset.hasPermissionOfAdmin)
        formCreate.setValue('hasPermissionOfSale', defaultValuesToReset.hasPermissionOfSale)
        formCreate.setValue('hasPermissionOfProject', defaultValuesToReset.hasPermissionOfProject)
        await formCreate.trigger()
    }, [formCreate, defaultValuesToReset])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        async (data: TypeForm) => {
            const { companyId, name, email, phone, isActive, hasPermissionOfRoot, hasPermissionOfAdmin, hasPermissionOfSale, hasPermissionOfProject } = data

            mutationUserCreate.mutate(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    is_active: isActive,
                    has_permission_of_root: hasPermissionOfRoot,
                    has_permission_of_admin: hasPermissionOfAdmin,
                    has_permission_of_sale: hasPermissionOfSale,
                    has_permission_of_project: hasPermissionOfProject,
                    company_id: companyId ?? null,
                },
                {
                    onSuccess: (userUpdated) => {
                        if (userUpdated) {
                            setDefaultValuesToReset((oldState) => ({
                                ...oldState,
                                companyId: companyId,
                                name: name,
                                email: email,
                                phone: phone,
                                isActive: isActive,
                                hasPermissionOfRoot: hasPermissionOfRoot,
                                hasPermissionOfAdmin: hasPermissionOfAdmin,
                                hasPermissionOfSale: hasPermissionOfSale,
                                hasPermissionOfProject: hasPermissionOfProject,
                            }))
                        }
                    },
                },
            )
        },
        [mutationUserCreate],
    )

    const effectStepFetching = React.useCallback(async () => {
        if (!queryUserGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryUserGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const companyId = queryUserGet.data?.company_id ?? DEFAULT_VALUES.companyId
        const name = queryUserGet.data?.name ?? DEFAULT_VALUES.name
        const email = queryUserGet.data?.email ?? DEFAULT_VALUES.email
        const phone = queryUserGet.data?.phone ?? DEFAULT_VALUES.phone
        const isActive = queryUserGet.data?.is_active ?? DEFAULT_VALUES.isActive
        const hasPermissionOfRoot = queryUserGet.data?.has_permission_of_root ?? DEFAULT_VALUES.hasPermissionOfRoot
        const hasPermissionOfAdmin = queryUserGet.data?.has_permission_of_admin ?? DEFAULT_VALUES.hasPermissionOfAdmin
        const hasPermissionOfSale = queryUserGet.data?.has_permission_of_sale ?? DEFAULT_VALUES.hasPermissionOfSale
        const hasPermissionOfProject = queryUserGet.data?.has_permission_of_project ?? DEFAULT_VALUES.hasPermissionOfProject
        setDefaultValuesToReset((oldState) => ({
            ...oldState,
            companyId: companyId,
            name: name,
            email: email,
            phone: phone,
            isActive: isActive,
            hasPermissionOfRoot: hasPermissionOfRoot,
            hasPermissionOfAdmin: hasPermissionOfAdmin,
            hasPermissionOfSale: hasPermissionOfSale,
            hasPermissionOfProject: hasPermissionOfProject,
        }))
        formCreate.setValue('companyId', companyId)
        formCreate.setValue('name', name)
        formCreate.setValue('email', email)
        formCreate.setValue('phone', phone)
        formCreate.setValue('isActive', isActive)
        formCreate.setValue('hasPermissionOfRoot', hasPermissionOfRoot)
        formCreate.setValue('hasPermissionOfAdmin', hasPermissionOfAdmin)
        formCreate.setValue('hasPermissionOfSale', hasPermissionOfSale)
        formCreate.setValue('hasPermissionOfProject', hasPermissionOfProject)
        await formCreate.trigger()
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [queryUserGet.data, formCreate])

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

    if (mutationUserCreate.data) {
        return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.page.workspace.root.user[':id'].update).getTo({ id: mutationUserCreate.data.id })} />
    }

    if (queryUserGet.data && queryUserGet.data.has_permission_of_root) {
        return <app.component.navigate.ToAppErrorForbidden />
    }

    return (
        <app.component.dialog.Dialog>
            <app.layout.main.component.structure.page.Page maxWidth={'sm'}>
                {queryUserGet.isFetching || mutationUserCreate.isPending || formCreate.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
                <app.layout.main.component.structure.head.spaceBetween.Head>
                    <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                        <app.layout.main.component.structure.box.title.Title level={1}>
                            <mui.icon.AddCircle />
                            {i18n.getText('title')}
                        </app.layout.main.component.structure.box.title.Title>
                    </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                        <app.component.button.Button space={1} disabled={queryUserGet.isFetching || mutationUserCreate.isPending || formCreate.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                            {queryUserGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                            {i18n.getText('action.refresh')}
                        </app.component.button.Button>
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.page.workspace.root.user).getTo()} variant={'contained'} space={1} disabled={queryUserGet.isFetching || mutationUserCreate.isPending || formCreate.formState.isSubmitting} typographyProps={{ variant: 'body2' }}>
                            <mui.icon.Close sx={{ m: `0 !important` }} />
                        </app.component.button.ButtonLink>
                    </app.layout.main.component.structure.head.spaceBetween.HeadRight>
                </app.layout.main.component.structure.head.spaceBetween.Head>
                {queryUserGet.isFetching ? (
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
                                        name={'companyId'}
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldCompanyId,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.autocomplete.Autocomplete
                                                required={true}
                                                InputProps={{
                                                    startAdornment: (
                                                        <mui.component.InputAdornment position={'end'}>
                                                            <mui.icon.Business />
                                                        </mui.component.InputAdornment>
                                                    ),
                                                }}
                                                label={i18n.getText('field.company-id.label')}
                                                error={!!formCreate.formState.errors.companyId}
                                                helperText={formCreate.formState.errors.companyId?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
                                                autoFocus={true}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                                selected={autocompleteSelectedFieldCompanyId}
                                                options={autocompleteOptionsFieldCompanyId}
                                                onChange={autocompleteOnChangeFieldCompanyId}
                                            />
                                        )}
                                    />
                                    <form.component.Controller
                                        name={'name'}
                                        control={formCreate.control}
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
                                                error={!!formCreate.formState.errors.name}
                                                helperText={formCreate.formState.errors.name?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldEmail,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.text.TextEmail
                                                required={true}
                                                label={i18n.getText('field.email.label')}
                                                error={!!formCreate.formState.errors.email}
                                                helperText={formCreate.formState.errors.email?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldPhone,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.text.TextPhone
                                                required={false}
                                                label={i18n.getText('field.phone.label')}
                                                error={!!formCreate.formState.errors.phone}
                                                helperText={formCreate.formState.errors.phone?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldIsActive,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.checkbox.Checkbox
                                                required={false}
                                                label={i18n.getText('field.is-active.label')}
                                                error={!!formCreate.formState.errors.isActive}
                                                helperText={formCreate.formState.errors.isActive?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                        name={'hasPermissionOfRoot'}
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldHasPermissionOfRoot,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.checkbox.Checkbox
                                                required={false}
                                                label={i18n.getText('field.has-permission-of-root.label')}
                                                error={!!formCreate.formState.errors.hasPermissionOfRoot}
                                                helperText={formCreate.formState.errors.hasPermissionOfRoot?.message}
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
                                        name={'hasPermissionOfAdmin'}
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldHasPermissionOfAdmin,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.checkbox.Checkbox
                                                required={false}
                                                label={i18n.getText('field.has-permission-of-admin.label')}
                                                error={!!formCreate.formState.errors.hasPermissionOfAdmin}
                                                helperText={formCreate.formState.errors.hasPermissionOfAdmin?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                        name={'hasPermissionOfSale'}
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldHasPermissionOfSale,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.checkbox.Checkbox
                                                required={false}
                                                label={i18n.getText('field.has-permission-of-sale.label')}
                                                error={!!formCreate.formState.errors.hasPermissionOfSale}
                                                helperText={formCreate.formState.errors.hasPermissionOfSale?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                        name={'hasPermissionOfProject'}
                                        control={formCreate.control}
                                        rules={{
                                            validate: {
                                                handleValidateFieldHasPermissionOfProject,
                                            },
                                        }}
                                        render={({ field }) => (
                                            <app.component.field.checkbox.Checkbox
                                                required={false}
                                                label={i18n.getText('field.has-permission-of-project.label')}
                                                error={!!formCreate.formState.errors.hasPermissionOfProject}
                                                helperText={formCreate.formState.errors.hasPermissionOfProject?.message}
                                                disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting}
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
                                {mutationUserCreate.isPending || formCreate.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                                <app.layout.main.component.structure.box.action.Action>
                                    <app.component.button.ButtonSubmit space={1} disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting || formCreate.formState.isValidating || !formCreate.formState.isValid} onClick={formCreate.handleSubmit(handleActionSubmit)}>
                                        {mutationUserCreate.isPending || formCreate.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Save />}
                                        {i18n.getText('action.submit')}
                                    </app.component.button.ButtonSubmit>
                                    <app.component.button.Button space={1} disabled={mutationUserCreate.isPending || formCreate.formState.isSubmitting} onClick={handleActionReset}>
                                        {formCreate.formState.isValidating ? <app.component.loading.ProgressCircular /> : <mui.icon.Restore />}
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

export const Create = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
