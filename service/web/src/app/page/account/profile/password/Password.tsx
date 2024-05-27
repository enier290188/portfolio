import { app, appServiceApiPageAccountType, appType } from '@./app'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeForm = {
    passwordCurrent: string
    passwordNew: string
    passwordConfirm: string
}

const DEFAULT_VALUES: TypeForm = {
    passwordCurrent: '',
    passwordNew: '',
    passwordConfirm: '',
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.profile.password, i18nLanguage), [i18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)
    const alertActionAddAlert = contextAlert.addAlert

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getAccessToken()
    const accessTokenActionUpdateAccessToken = contextAccessToken.updateAccessToken

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userId = user?.id ?? ''
    const userActionSyncUser = contextUser.syncUser

    const queryClient = query.hook.useQueryClient()
    const queryUserGet = query.hook.useQuery({
        queryKey: [`/app/page/account/profile/`, 'query', 'db'],
        queryFn: async (): Promise<null | appType.TypeServiceApiPageAccountProfileResponse> => {
            const response = await app.service.api.page.account.profile_get({ accessToken: accessToken, id: userId })
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
    const mutationUserUpdate = query.hook.useMutation({
        mutationKey: [`/app/page/account/profile/password/`, 'mutation', 'db'],
        mutationFn: async (user: appServiceApiPageAccountType.TypeProfilePasswordUpdateRequest['user']): Promise<null | appType.TypeServiceApiPageAccountProfileResponse> => {
            const response = await app.service.api.page.account.profile_password_update({ accessToken: accessToken, user: user })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                queryClient.setQueryData([`/app/page/account/profile/`, 'query', 'db'], response.data.item)
                alertActionAddAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return response.data?.item ?? null
            } else {
                if (response.data.detail.error === 'CouldNotValidateUserCredentials') {
                    alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error.CouldNotValidateUserCredentials') })
                } else {
                    alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                }
                return null
            }
        },
    })

    const formUpdate = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [defaultValuesToReset, setDefaultValuesToReset] = React.useState<TypeForm>(DEFAULT_VALUES)
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const watchValueFieldPasswordNew = formUpdate.watch('passwordNew')
    const refValueFieldPasswordNew = React.useRef<null | string>(null)

    const handleValidateFieldPasswordCurrent = React.useCallback(
        (value: TypeForm['passwordCurrent']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.password-current.validate.required'))
            }
            if (value.length < 8) {
                messageList.push(i18n.getText('field.password-current.validate.min-length', { value: 8 }))
            }
            if (24 < value.length) {
                messageList.push(i18n.getText('field.password-current.validate.max-length', { value: 24 }))
            }
            if (!/(?=.*\d)/.test(value)) {
                messageList.push(i18n.getText('field.password-current.validate.pattern.have-at-least-one-number'))
            }
            if (!/(?=.*[a-z])/.test(value)) {
                messageList.push(i18n.getText('field.password-current.validate.pattern.have-at-least-one-lowercase-letter'))
            }
            if (!/(?=.*[A-Z])/.test(value)) {
                messageList.push(i18n.getText('field.password-current.validate.pattern.have-at-least-one-uppercase-letter'))
            }
            if (!/(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(value)) {
                messageList.push(i18n.getText('field.password-current.validate.pattern.have-at-least-one-symbol'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldPasswordNew = React.useCallback(
        (value: TypeForm['passwordNew']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.password-new.validate.required'))
            }
            if (value.length < 8) {
                messageList.push(i18n.getText('field.password-new.validate.min-length', { value: 8 }))
            }
            if (24 < value.length) {
                messageList.push(i18n.getText('field.password-new.validate.max-length', { value: 24 }))
            }
            if (!/(?=.*\d)/.test(value)) {
                messageList.push(i18n.getText('field.password-new.validate.pattern.have-at-least-one-number'))
            }
            if (!/(?=.*[a-z])/.test(value)) {
                messageList.push(i18n.getText('field.password-new.validate.pattern.have-at-least-one-lowercase-letter'))
            }
            if (!/(?=.*[A-Z])/.test(value)) {
                messageList.push(i18n.getText('field.password-new.validate.pattern.have-at-least-one-uppercase-letter'))
            }
            if (!/(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(value)) {
                messageList.push(i18n.getText('field.password-new.validate.pattern.have-at-least-one-symbol'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleValidateFieldPasswordConfirm = React.useCallback(
        (value: TypeForm['passwordConfirm'], formValues: TypeForm) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('field.password-confirm.validate.required'))
            }
            if (value !== formValues.passwordNew) {
                messageList.push(i18n.getText('field.password-confirm.validate.match'))
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
        formUpdate.setValue('passwordCurrent', defaultValuesToReset.passwordCurrent)
        formUpdate.setValue('passwordNew', defaultValuesToReset.passwordNew)
        formUpdate.setValue('passwordConfirm', defaultValuesToReset.passwordConfirm)
        await formUpdate.trigger()
    }, [formUpdate, defaultValuesToReset])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        async (data: TypeForm) => {
            const { passwordCurrent, passwordNew } = data

            mutationUserUpdate.mutate(
                {
                    id: userId,
                    password_current: passwordCurrent,
                    password_new: passwordNew,
                },
                {
                    onSuccess: (userUpdated) => {
                        if (user && userUpdated) {
                            setEffectStep(EFFECT_STEP.FILLING)
                        }
                    },
                },
            )
        },
        [user, userId, mutationUserUpdate],
    )

    const effectStepFetching = React.useCallback(async () => {
        if (!queryUserGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryUserGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const passwordCurrent = DEFAULT_VALUES.passwordCurrent
        const passwordNew = DEFAULT_VALUES.passwordNew
        const passwordConfirm = DEFAULT_VALUES.passwordConfirm
        setDefaultValuesToReset((oldState) => ({
            ...oldState,
            passwordCurrent: passwordCurrent,
            passwordNew: passwordNew,
            passwordConfirm: passwordConfirm,
        }))
        formUpdate.setValue('passwordCurrent', passwordCurrent)
        formUpdate.setValue('passwordNew', passwordNew)
        formUpdate.setValue('passwordConfirm', passwordConfirm)
        await formUpdate.trigger()
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [formUpdate])

    const effectStepDefault = React.useCallback(async () => {
        if (refValueFieldPasswordNew.current === null) {
            refValueFieldPasswordNew.current = watchValueFieldPasswordNew
        }
        if (watchValueFieldPasswordNew !== refValueFieldPasswordNew.current) {
            await formUpdate.trigger(['passwordConfirm'])
            refValueFieldPasswordNew.current = watchValueFieldPasswordNew
        }
    }, [formUpdate, watchValueFieldPasswordNew])

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
                effectStepDefault()
                    .then(() => null)
                    .catch(() => null)
                break
        }
    }, [effectStep, effectStepFetching, effectStepFilling, effectStepDefault])

    if (!queryUserGet.isFetching && !queryUserGet.data) {
        return <app.component.navigate.ToAppErrorNotFound />
    }

    return (
        <>
            {queryUserGet.isFetching || mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.head.spaceBetween.Head>
                <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.box.title.Title level={2}>
                        <mui.icon.Password />
                        {i18n.getText('title')}
                    </app.layout.main.component.structure.box.title.Title>
                </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                    <app.component.button.Button space={1} disabled={queryUserGet.isFetching || mutationUserUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                        {queryUserGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                        {i18n.getText('action.refresh')}
                    </app.component.button.Button>
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
                    <app.layout.main.component.structure.body.Body alignItems={'center'}>
                        <mui.component.Box component={'form'} width={'100%'} maxWidth={'375px'} my={4} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                            <app.layout.main.component.structure.box.content.Content>
                                <form.component.Controller
                                    name={'passwordCurrent'}
                                    control={formUpdate.control}
                                    rules={{
                                        validate: {
                                            handleValidateFieldPasswordCurrent,
                                        },
                                    }}
                                    render={({ field }) => (
                                        <app.component.field.text.TextPassword
                                            required={true}
                                            label={i18n.getText('field.password-current.label')}
                                            error={!!formUpdate.formState.errors.passwordCurrent}
                                            helperText={formUpdate.formState.errors.passwordCurrent?.message}
                                            disabled={formUpdate.formState.isSubmitting}
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
                                    name={'passwordNew'}
                                    control={formUpdate.control}
                                    rules={{
                                        validate: {
                                            handleValidateFieldPasswordNew,
                                        },
                                    }}
                                    render={({ field }) => (
                                        <app.component.field.text.TextPassword
                                            required={true}
                                            label={i18n.getText('field.password-new.label')}
                                            error={!!formUpdate.formState.errors.passwordNew}
                                            helperText={formUpdate.formState.errors.passwordNew?.message}
                                            disabled={formUpdate.formState.isSubmitting}
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
                                    name={'passwordConfirm'}
                                    control={formUpdate.control}
                                    rules={{
                                        validate: {
                                            handleValidateFieldPasswordConfirm,
                                        },
                                    }}
                                    render={({ field }) => (
                                        <app.component.field.text.TextPassword
                                            required={true}
                                            label={i18n.getText('field.password-confirm.label')}
                                            error={!!formUpdate.formState.errors.passwordConfirm}
                                            helperText={formUpdate.formState.errors.passwordConfirm?.message}
                                            disabled={formUpdate.formState.isSubmitting}
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
                            {mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                            <app.layout.main.component.structure.box.action.Action>
                                <app.component.button.ButtonSubmit space={1} disabled={mutationUserUpdate.isPending || formUpdate.formState.isSubmitting || formUpdate.formState.isValidating || !formUpdate.formState.isValid} onClick={formUpdate.handleSubmit(handleActionSubmit)}>
                                    {mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Save />}
                                    {i18n.getText('action.submit')}
                                </app.component.button.ButtonSubmit>
                                <app.component.button.Button space={1} disabled={mutationUserUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionReset}>
                                    {formUpdate.formState.isValidating ? <app.component.loading.ProgressCircular /> : <mui.icon.Restore />}
                                    {i18n.getText('action.reset')}
                                </app.component.button.Button>
                            </app.layout.main.component.structure.box.action.Action>
                        </mui.component.Box>
                    </app.layout.main.component.structure.body.Body>
                </>
            )}
        </>
    )
}

export const Password = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
