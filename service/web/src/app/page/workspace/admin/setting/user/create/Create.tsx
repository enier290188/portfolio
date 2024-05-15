import { app } from '@./app'
// import { awsAmplifyApi, awsAmplifyApiType } from '@./package/aws-amplify-api'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeForm = {
    name: string
    email: string
    phone: string
}

const DEFAULT_VALUES: TypeForm = {
    name: '',
    email: '',
    phone: '',
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.admin.setting.user.create, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const queryClient = query.hook.useQueryClient()
    const queryUserGet = query.hook.useQuery({
        queryKey: [`/app/page/workspace/admin/setting/user/create/`, 'query', 'db'],
        queryFn: () => ({
            name: DEFAULT_VALUES.name,
            email: DEFAULT_VALUES.email,
            phone: DEFAULT_VALUES.phone,
        }),
        initialData: null,
    })
    const mutationUserCreate = query.hook.useMutation({
        mutationKey: [`/app/page/workspace/admin/setting/user/create/`, 'mutation', 'db'],
        mutationFn: (user: awsAmplifyApiType.CreateUserInput) => awsAmplifyApi.page.workspace.admin.setting.user.create({ user: user }),
    })

    const formCreate = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
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
            if (320 < value.length) {
                messageList.push(i18n.getText('field.email.validate.max-length', { value: 320 }))
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
        await queryUserGet.refetch()
    }, [queryUserGet])

    const handleActionReset = React.useCallback(async () => {
        formCreate.setValue('name', defaultValuesToReset.name)
        formCreate.setValue('email', defaultValuesToReset.email)
        formCreate.setValue('phone', defaultValuesToReset.phone)
        await formCreate.trigger()
    }, [formCreate, defaultValuesToReset])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        async (data: TypeForm) => {
            const { name, email, phone } = data
            mutationUserCreate.mutate(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    groupList: ['Admin', 'Sale', 'Project'],
                },
                {
                    onSuccess: (userCreated: awsAmplifyApiType.User | null) => {
                        if (userCreated) {
                            queryClient.setQueryData([`/app/page/workspace/admin/setting/user/${userCreated.id}/`, 'query', 'db'], userCreated)
                            queryClient.setQueryData([`/app/page/workspace/admin/setting/user/list/`, 'query', 'db'], (userList: awsAmplifyApiType.User[] | undefined) => (userList ? [...userList, userCreated] : [userCreated]))
                            contextAlert.addAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                            setDefaultValuesToReset((oldState) => ({
                                ...oldState,
                                name: name,
                                email: email,
                                phone: phone,
                            }))
                        } else {
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                        }
                    },
                    onError: () => {
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                    },
                },
            )
        },
        [i18n, contextAlert, queryClient, mutationUserCreate],
    )

    const effectStepFetching = React.useCallback(async () => {
        if (!queryUserGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryUserGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const name = queryUserGet.data?.name ?? DEFAULT_VALUES.name
        const email = queryUserGet.data?.email ?? DEFAULT_VALUES.email
        const phone = queryUserGet.data?.phone ?? DEFAULT_VALUES.phone
        setDefaultValuesToReset((oldState) => ({
            ...oldState,
            name: name,
            email: email,
            phone: phone,
        }))
        formCreate.setValue('name', name)
        formCreate.setValue('email', email)
        formCreate.setValue('phone', phone)
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
        return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.admin.setting.user[':id'].update).getTo({ id: mutationUserCreate.data.id })} />
    }

    if (!queryUserGet.isFetching && !queryUserGet.data) {
        return <app.component.navigate.ToAppErrorNotFound />
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
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.workspace.admin.setting.user).getTo()} variant={'contained'} space={1} disabled={queryUserGet.isFetching || mutationUserCreate.isPending || formCreate.formState.isSubmitting} typographyProps={{ variant: 'body2' }}>
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
                                                required={true}
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
