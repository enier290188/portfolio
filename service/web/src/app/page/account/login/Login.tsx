import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import React from 'react'

type TypeFormLogin = {
    email: string
    password: string
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.login, i18nLanguage), [i18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)
    const alertActionAddAlert = contextAlert.addAlert

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessTokenActionUpdateAccessToken = contextAccessToken.updateAccessToken

    const contextUser = React.useContext(app.context.user.Context)
    const userActionLoginUser = contextUser.loginUser

    const formLogin = form.hook.useForm<TypeFormLogin>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    })

    const handleFormLoginValidateEmail = React.useCallback(
        (value: TypeFormLogin['email']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('login.field.email.validate.required'))
            }
            if (128 < value.length) {
                messageList.push(i18n.getText('login.field.email.validate.max-length', { value: 128 }))
            }
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                messageList.push(i18n.getText('login.field.email.validate.pattern'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleFormLoginValidatePassword = React.useCallback(
        (value: TypeFormLogin['password']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('login.field.password.validate.required'))
            }
            if (value.length < 8) {
                messageList.push(i18n.getText('login.field.password.validate.min-length', { value: 8 }))
            }
            if (32 < value.length) {
                messageList.push(i18n.getText('login.field.password.validate.max-length', { value: 32 }))
            }
            if (!/(?=.*\d)/.test(value)) {
                messageList.push(i18n.getText('login.field.password.validate.pattern.have-at-least-one-number'))
            }
            if (!/(?=.*[a-z])/.test(value)) {
                messageList.push(i18n.getText('login.field.password.validate.pattern.have-at-least-one-lowercase-letter'))
            }
            if (!/(?=.*[A-Z])/.test(value)) {
                messageList.push(i18n.getText('login.field.password.validate.pattern.have-at-least-one-uppercase-letter'))
            }
            if (!/(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(value)) {
                messageList.push(i18n.getText('login.field.password.validate.pattern.have-at-least-one-symbol'))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n],
    )

    const handleFormLoginSubmit: formType.SubmitHandler<TypeFormLogin> = React.useCallback(
        async (data) => {
            const { email, password } = data

            const response = await app.service.api.page.account.login(email, password)

            if (response.status === 200) {
                const accessToken = response.data.auth.access_token
                const userModel = response.data.auth.user
                alertActionAddAlert({ type: 'success', message: i18n.getText('login.action.submit.alert.success', { name: userModel.name ? userModel.name : userModel.email ? userModel.email : '' }) })
                accessTokenActionUpdateAccessToken(accessToken)
                userActionLoginUser(userModel)
            } else {
                if ('error' in response.data.detail) {
                    alertActionAddAlert({ type: 'error', message: i18n.getText(`login.action.submit.alert.error.${response.data.detail.error}`) })
                } else {
                    alertActionAddAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error.SomethingWentWrong') })
                }
            }
        },
        [i18n, alertActionAddAlert, accessTokenActionUpdateAccessToken, userActionLoginUser],
    )

    return (
        <app.layout.main.component.structure.page.Page key={'login'} maxWidth={'375px'}>
            {formLogin.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.head.Head>
                <app.layout.main.component.structure.box.title.Title level={1}>
                    <mui.icon.Login />
                    {i18n.getText('login.title')}
                </app.layout.main.component.structure.box.title.Title>
            </app.layout.main.component.structure.head.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.Body>
                <mui.component.Box component={'form'} width={'100%'} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                    <app.layout.main.component.structure.box.content.Content>
                        <form.component.Controller
                            name={'email'}
                            control={formLogin.control}
                            rules={{
                                validate: {
                                    handleFormLoginValidateEmail,
                                },
                            }}
                            render={({ field }) => (
                                <app.component.field.text.TextEmail
                                    required={true}
                                    autoComplete={'current-email'}
                                    label={i18n.getText('login.field.email.label')}
                                    error={!!formLogin.formState.errors.email}
                                    helperText={formLogin.formState.errors.email?.message}
                                    disabled={formLogin.formState.isSubmitting}
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
                            name={'password'}
                            control={formLogin.control}
                            rules={{
                                validate: {
                                    handleFormLoginValidatePassword,
                                },
                            }}
                            render={({ field }) => (
                                <app.component.field.text.TextPassword
                                    required={true}
                                    autoComplete={'current-password'}
                                    label={i18n.getText('login.field.password.label')}
                                    error={!!formLogin.formState.errors.password}
                                    helperText={formLogin.formState.errors.password?.message}
                                    disabled={formLogin.formState.isSubmitting}
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
                    {formLogin.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                    <app.layout.main.component.structure.box.action.Action>
                        <app.component.button.ButtonSubmit space={1} disabled={formLogin.formState.isSubmitting || formLogin.formState.isValidating || !formLogin.formState.isValid} onClick={formLogin.handleSubmit(handleFormLoginSubmit)}>
                            {formLogin.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Login />}
                            {i18n.getText('login.action.submit')}
                        </app.component.button.ButtonSubmit>
                    </app.layout.main.component.structure.box.action.Action>
                </mui.component.Box>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    )
}

export const Login = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
