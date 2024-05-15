import { app } from '@./app'
import { awsAmplifyAuth } from '@./package/aws-amplify-auth'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import React from 'react'

type TypeFormSendCode = {
    email: string
}

type TypeFormNewPassword = {
    email: string
    code: string
    password: string
    confirmPassword: string
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.forgot, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const [searchParams] = router.hook.useSearchParams()
    const searchParamEmail = searchParams.get('email')
    const searchParamCodeSent = searchParams.get('codeSent')

    const [hasCodeBeenSent, setHasCodeBeenSent] = React.useState<boolean>(searchParamCodeSent === 'true')
    const [hasPasswordBeenChanged, setHasPasswordBeenChanged] = React.useState<boolean>(false)

    const formSendCode = form.hook.useForm<TypeFormSendCode>({
        defaultValues: {
            email: ''
        },
        mode: 'onChange'
    })

    const formNewPassword = form.hook.useForm<TypeFormNewPassword>({
        defaultValues: {
            email: searchParamEmail ?? '',
            code: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange'
    })
    const formNewPasswordWatchPassword = formNewPassword.watch('password')
    const formNewPasswordWatchConfirmPassword = formNewPassword.watch('confirmPassword')
    const formNewPasswordSetValue = formNewPassword.setValue
    const formNewPasswordTrigger = formNewPassword.trigger

    const handleFormSendCodeValidateEmail = React.useCallback(
        (value: TypeFormSendCode['email']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('send-code.field.email.validate.required'))
            }
            if (320 < value.length) {
                messageList.push(i18n.getText('send-code.field.email.validate.max-length', { value: 320 }))
            }
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                messageList.push(i18n.getText('send-code.field.email.validate.pattern'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n]
    )

    const handleFormSendCodeSubmit: formType.SubmitHandler<TypeFormSendCode> = React.useCallback(
        async (data) => {
            const { email } = data
            const amplifyAuthForgotSendCodeResult = await awsAmplifyAuth.forgotSendCode(email)
            if (!amplifyAuthForgotSendCodeResult.error) {
                contextAlert.addAlert({ type: 'success', message: i18n.getText('send-code.action.submit.alert.success') })
                setHasCodeBeenSent(true)
                formNewPasswordSetValue('email', email)
            } else {
                switch (amplifyAuthForgotSendCodeResult.error.code) {
                    case 'LimitExceededException':
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('send-code.action.submit.alert.error.LimitExceededException') })
                        break
                    default:
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('send-code.action.submit.alert.error') })
                }
            }
        },
        [i18n, contextAlert, formNewPasswordSetValue]
    )

    const handleFormNewPasswordValidateEmail = React.useCallback(
        (value: TypeFormSendCode['email']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('send-code.field.email.validate.required'))
            }
            if (320 < value.length) {
                messageList.push(i18n.getText('send-code.field.email.validate.max-length', { value: 320 }))
            }
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                messageList.push(i18n.getText('send-code.field.email.validate.pattern'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n]
    )

    const handleFormNewPasswordValidateCode = React.useCallback(
        (value: TypeFormNewPassword['code']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('new-password.field.code.validate.required'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n]
    )

    const handleFormNewPasswordValidatePassword = React.useCallback(
        (value: TypeFormNewPassword['password']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('new-password.field.password.validate.required'))
            }
            if (value.length < 8) {
                messageList.push(i18n.getText('new-password.field.password.validate.min-length', { value: 8 }))
            }
            if (32 < value.length) {
                messageList.push(i18n.getText('new-password.field.password.validate.max-length', { value: 32 }))
            }
            if (!/(?=.*\d)/.test(value)) {
                messageList.push(i18n.getText('new-password.field.password.validate.pattern.have-at-least-one-number'))
            }
            if (!/(?=.*[a-z])/.test(value)) {
                messageList.push(i18n.getText('new-password.field.password.validate.pattern.have-at-least-one-lowercase-letter'))
            }
            if (!/(?=.*[A-Z])/.test(value)) {
                messageList.push(i18n.getText('new-password.field.password.validate.pattern.have-at-least-one-uppercase-letter'))
            }
            if (!/(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(value)) {
                messageList.push(i18n.getText('new-password.field.password.validate.pattern.have-at-least-one-symbol'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n]
    )

    const handleFormNewPasswordValidateConfirmPassword = React.useCallback(
        (value: TypeFormNewPassword['confirmPassword']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('new-password.field.confirm-password.validate.required'))
            }
            if (value !== formNewPasswordWatchPassword) {
                messageList.push(i18n.getText('new-password.field.confirm-password.validate.match'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n, formNewPasswordWatchPassword]
    )

    const handleFormNewPasswordSubmit: formType.SubmitHandler<TypeFormNewPassword> = React.useCallback(
        async (data) => {
            if (hasCodeBeenSent) {
                const { email, code, password } = data
                const amplifyAuthForgotNewPasswordResult = await awsAmplifyAuth.forgotNewPassword(email, code, password)
                if (!amplifyAuthForgotNewPasswordResult.error) {
                    contextAlert.addAlert({ type: 'success', message: i18n.getText('new-password.action.submit.alert.success') })
                    setHasPasswordBeenChanged(true)
                } else {
                    switch (amplifyAuthForgotNewPasswordResult.error.code) {
                        case 'CodeMismatchException':
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.CodeMismatchException') })
                            break
                        case 'ExpiredCodeException':
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.ExpiredCodeException') })
                            setHasCodeBeenSent(false)
                            break
                        case 'LimitExceededException':
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.LimitExceededException') })
                            setHasCodeBeenSent(false)
                            break
                        default:
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error') })
                    }
                }
            }
        },
        [i18n, contextAlert, hasCodeBeenSent]
    )

    React.useEffect(() => {
        if (hasCodeBeenSent) {
            if (formNewPasswordWatchPassword === '' && formNewPasswordWatchConfirmPassword === '') {
                formNewPasswordTrigger(['email', 'code', 'password', 'confirmPassword']).then(() => null)
            } else {
                formNewPasswordTrigger(['confirmPassword']).then(() => null)
            }
        }
    }, [hasCodeBeenSent, formNewPasswordWatchPassword, formNewPasswordWatchConfirmPassword, formNewPasswordTrigger])

    if (hasPasswordBeenChanged) {
        return <app.component.navigate.ToAppAccountLogin />
    }

    return !hasCodeBeenSent ? (
        <app.layout.main.component.structure.page.Page key={'send-code'} maxWidth={'375px'}>
            {formSendCode.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.head.Head>
                <app.layout.main.component.structure.box.title.Title level={1}>
                    <mui.icon.PersonSearch />
                    {i18n.getText('send-code.title')}
                </app.layout.main.component.structure.box.title.Title>
            </app.layout.main.component.structure.head.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.Body>
                <mui.component.Box component={'form'} width={'100%'} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                    <app.layout.main.component.structure.box.content.Content>
                        <form.component.Controller
                            name={'email'}
                            control={formSendCode.control}
                            rules={{
                                validate: {
                                    handleFormSendCodeValidateEmail
                                }
                            }}
                            render={({ field }) => (
                                <app.component.field.text.TextEmail
                                    required={true}
                                    label={i18n.getText('send-code.field.email.label')}
                                    error={!!formSendCode.formState.errors.email}
                                    helperText={formSendCode.formState.errors.email?.message}
                                    disabled={formSendCode.formState.isSubmitting}
                                    autoFocus={true}
                                    space={{
                                        top: 2,
                                        right: 1,
                                        bottom: 1,
                                        left: 1
                                    }}
                                    field={field}
                                />
                            )}
                        />
                    </app.layout.main.component.structure.box.content.Content>
                    {formSendCode.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                    <app.layout.main.component.structure.box.action.Action>
                        <app.component.button.ButtonSubmit space={1} disabled={formSendCode.formState.isSubmitting || formSendCode.formState.isValidating || !formSendCode.formState.isValid} onClick={formSendCode.handleSubmit(handleFormSendCodeSubmit)}>
                            {formSendCode.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Send />}
                            {i18n.getText('send-code.action.submit')}
                        </app.component.button.ButtonSubmit>
                    </app.layout.main.component.structure.box.action.Action>
                </mui.component.Box>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    ) : (
        <app.layout.main.component.structure.page.Page key={'new-password'} maxWidth={'375px'}>
            {formNewPassword.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.head.Head>
                <app.layout.main.component.structure.box.title.Title level={1}>
                    <mui.icon.LockReset />
                    {i18n.getText('new-password.title')}
                </app.layout.main.component.structure.box.title.Title>
            </app.layout.main.component.structure.head.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.Body>
                <mui.component.Box component={'form'} width={'100%'} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                    <app.layout.main.component.structure.box.content.Content>
                        <form.component.Controller
                            name={'email'}
                            control={formNewPassword.control}
                            rules={{
                                validate: {
                                    handleFormNewPasswordValidateEmail
                                }
                            }}
                            render={({ field }) => (
                                <app.component.field.text.TextEmail
                                    required={true}
                                    label={i18n.getText('new-password.field.email.label')}
                                    error={!!formNewPassword.formState.errors.email}
                                    helperText={formNewPassword.formState.errors.email?.message}
                                    disabled={true}
                                    space={{
                                        top: 2,
                                        right: 1,
                                        bottom: 1,
                                        left: 1
                                    }}
                                    field={field}
                                />
                            )}
                        />
                        <form.component.Controller
                            name={'code'}
                            control={formNewPassword.control}
                            rules={{
                                validate: {
                                    handleFormNewPasswordValidateCode
                                }
                            }}
                            render={({ field }) => (
                                <app.component.field.text.Text
                                    type={'text'}
                                    required={true}
                                    InputProps={{
                                        startAdornment: (
                                            <mui.component.InputAdornment position={'start'}>
                                                <mui.icon.Key />
                                            </mui.component.InputAdornment>
                                        )
                                    }}
                                    label={i18n.getText('new-password.field.code.label')}
                                    error={!!formNewPassword.formState.errors.code}
                                    helperText={formNewPassword.formState.errors.code?.message}
                                    disabled={formNewPassword.formState.isSubmitting}
                                    autoFocus={true}
                                    space={{
                                        top: 2,
                                        right: 1,
                                        bottom: 1,
                                        left: 1
                                    }}
                                    field={field}
                                />
                            )}
                        />
                        <form.component.Controller
                            name={'password'}
                            control={formNewPassword.control}
                            rules={{
                                validate: {
                                    handleFormNewPasswordValidatePassword
                                }
                            }}
                            render={({ field }) => (
                                <app.component.field.text.TextPassword
                                    required={true}
                                    label={i18n.getText('new-password.field.password.label')}
                                    error={!!formNewPassword.formState.errors.password}
                                    helperText={formNewPassword.formState.errors.password?.message}
                                    disabled={formNewPassword.formState.isSubmitting}
                                    space={{
                                        top: 2,
                                        right: 1,
                                        bottom: 1,
                                        left: 1
                                    }}
                                    field={field}
                                />
                            )}
                        />
                        <form.component.Controller
                            name={'confirmPassword'}
                            control={formNewPassword.control}
                            rules={{
                                validate: {
                                    handleFormNewPasswordValidateConfirmPassword
                                }
                            }}
                            render={({ field }) => (
                                <app.component.field.text.TextPassword
                                    required={true}
                                    label={i18n.getText('new-password.field.confirm-password.label')}
                                    error={!!formNewPassword.formState.errors.confirmPassword}
                                    helperText={formNewPassword.formState.errors.confirmPassword?.message}
                                    disabled={formNewPassword.formState.isSubmitting}
                                    space={{
                                        top: 2,
                                        right: 1,
                                        bottom: 1,
                                        left: 1
                                    }}
                                    field={field}
                                />
                            )}
                        />
                    </app.layout.main.component.structure.box.content.Content>
                    {formNewPassword.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                    <app.layout.main.component.structure.box.action.Action>
                        <app.component.button.ButtonSubmit space={1} disabled={formNewPassword.formState.isSubmitting || formNewPassword.formState.isValidating || !formNewPassword.formState.isValid} onClick={formNewPassword.handleSubmit(handleFormNewPasswordSubmit)}>
                            {formNewPassword.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Save />}
                            {i18n.getText('new-password.action.submit')}
                        </app.component.button.ButtonSubmit>
                    </app.layout.main.component.structure.box.action.Action>
                </mui.component.Box>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    )
}

export const Forgot = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
