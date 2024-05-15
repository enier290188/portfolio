import { app } from '@./app'
// import { awsAmplifyApi } from '@./package/aws-amplify-api'
// import { awsAmplifyAuth } from '@./package/aws-amplify-auth'
// import { awsAmplifyStorage } from '@./package/aws-amplify-storage'
import { mui } from '@./package/material-ui'
import { form } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import React from 'react'

type TypeFormLogin = {
    email: string
    password: string
}

type TypeFormNewPassword = {
    password: string
    confirmPassword: string
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.login, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const contextUser = React.useContext(app.context.user.Context)

    const [userPasswordResetRequiredException, setUserPasswordResetRequiredException] = React.useState<boolean>(false)

    const [userCognitoNewPasswordRequired, setUserCognitoNewPasswordRequired] = React.useState<null | object>(null)

    const formLogin = form.hook.useForm<TypeFormLogin>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    })
    const formLoginWatchEmail = formLogin.watch('email')

    const formNewPassword = form.hook.useForm<TypeFormNewPassword>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    })
    const formNewPasswordWatchPassword = formNewPassword.watch('password')
    const formNewPasswordWatchConfirmPassword = formNewPassword.watch('confirmPassword')
    const formNewPasswordTrigger = formNewPassword.trigger

    const handleFormLoginValidateEmail = React.useCallback(
        (value: TypeFormLogin['email']) => {
            const messageList: string[] = []
            if (!value) {
                messageList.push(i18n.getText('login.field.email.validate.required'))
            }
            if (320 < value.length) {
                messageList.push(i18n.getText('login.field.email.validate.max-length', { value: 320 }))
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

    /*const handleFormLoginSubmit: formType.SubmitHandler<TypeFormLogin> = React.useCallback(
        async (data) => {
            const { email, password } = data
            const awsAmplifyAuthLoginResult = await awsAmplifyAuth.login(email, password)
            if (!awsAmplifyAuthLoginResult.error) {
                if (awsAmplifyAuthLoginResult?.data) {
                    if (awsAmplifyAuthLoginResult.data?.userCognitoNewPasswordRequired) {
                        setUserCognitoNewPasswordRequired(awsAmplifyAuthLoginResult.data.userCognitoNewPasswordRequired)
                    } else {
                        if (awsAmplifyAuthLoginResult.data?.userCognito) {
                            const userCognito = awsAmplifyAuthLoginResult.data.userCognito
                            const userCognitoGroupList: NonNullable<appType.TypeSettingUser>['groupList'] = userCognito.groupList
                            const userCognitoUsername = userCognito.username
                            if (0 < userCognitoGroupList.length) {
                                const userModelList = await awsAmplifyApi.page.account.login.user.list({
                                    email: email,
                                    groupList: userCognitoGroupList,
                                    cognitoUsername: userCognitoUsername,
                                })
                                if (1 === userModelList.length) {
                                    const userModel = userModelList[0]
                                    const picture = await awsAmplifyStorage.storage.get(`${app.setting.storage.APP_USER}${userModel.id}/picture.png`)
                                    contextAlert.addAlert({ type: 'success', message: i18n.getText('login.action.submit.alert.success', { name: userModel.name ? userModel.name : userModel.email ? userModel.email : '' }) })
                                    contextUser.login({
                                        id: userModel.id,
                                        name: userModel?.name ?? '',
                                        email: userModel?.email ?? '',
                                        phone: userModel?.phone ?? '',
                                        picture: picture ?? '',
                                        groupList: userCognitoGroupList ?? [],
                                    })
                                } else {
                                    if (0 === userModelList.length) {
                                        contextAlert.addAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error.UserIsNotAuthorized') })
                                    } else {
                                        contextAlert.addAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error.UserIsDuplicated') })
                                    }
                                }
                            } else {
                                contextAlert.addAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error.UserWithoutGroup') })
                            }
                        }
                    }
                }
            } else {
                switch (awsAmplifyAuthLoginResult.error.code) {
                    case 'NotAuthorizedException':
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error.NotAuthorizedException') })
                        break
                    case 'PasswordResetRequiredException':
                        contextAlert.addAlert({ type: 'warning', message: i18n.getText('login.action.submit.alert.error.PasswordResetRequiredException') })
                        setUserPasswordResetRequiredException(true)
                        break
                    case 'LimitExceededException':
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error.LimitExceededException') })
                        break
                    default:
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('login.action.submit.alert.error') })
                }
            }
        },
        [i18n, contextAlert, contextUser],
    )*/

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
        [i18n],
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
        [i18n, formNewPasswordWatchPassword],
    )

    /*const handleFormNewPasswordSubmit: formType.SubmitHandler<TypeFormNewPassword> = React.useCallback(
        async (data) => {
            if (userCognitoNewPasswordRequired) {
                const { password } = data
                const awsAmplifyAuthLoginNewPasswordRequiredResult = await awsAmplifyAuth.loginNewPasswordRequired(userCognitoNewPasswordRequired, password)
                if (!awsAmplifyAuthLoginNewPasswordRequiredResult.error) {
                    if (awsAmplifyAuthLoginNewPasswordRequiredResult?.data) {
                        if (awsAmplifyAuthLoginNewPasswordRequiredResult.data?.userCognito) {
                            const userCognito = awsAmplifyAuthLoginNewPasswordRequiredResult.data.userCognito
                            const userCognitoGroupList: NonNullable<appType.TypeSettingUser>['groupList'] = userCognito.groupList
                            const userCognitoUsername = userCognito.username
                            if (0 < userCognitoGroupList.length) {
                                const userModelList = await awsAmplifyApi.page.account.login.user.list({
                                    email: formLoginWatchEmail,
                                    groupList: userCognitoGroupList,
                                    cognitoUsername: userCognitoUsername,
                                })
                                if (1 === userModelList.length) {
                                    const userModel = userModelList[0]
                                    const picture = await awsAmplifyStorage.storage.get(`${app.setting.storage.APP_USER}${userModel.id}/picture.png`)
                                    contextAlert.addAlert({ type: 'success', message: i18n.getText('new-password.action.submit.alert.success', { name: userModel.name ? userModel.name : userModel.email ? userModel.email : '' }) })
                                    contextUser.login({
                                        id: userModel.id,
                                        name: userModel?.name ?? '',
                                        email: userModel?.email ?? '',
                                        phone: userModel?.phone ?? '',
                                        picture: picture ?? '',
                                        groupList: userCognitoGroupList ?? [],
                                    })
                                } else {
                                    if (0 === userModelList.length) {
                                        contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.UserIsNotAuthorized') })
                                    } else {
                                        contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.UserIsDuplicated') })
                                    }
                                }
                            } else {
                                contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.UserWithoutGroup') })
                            }
                        }
                    }
                } else {
                    switch (awsAmplifyAuthLoginNewPasswordRequiredResult.error.code) {
                        case 'NotAuthorizedException':
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.NotAuthorizedException') })
                            setUserCognitoNewPasswordRequired(null)
                            break
                        case 'LimitExceededException':
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error.LimitExceededException') })
                            setUserCognitoNewPasswordRequired(null)
                            break
                        default:
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('new-password.action.submit.alert.error') })
                    }
                }
            }
        },
        [i18n, contextAlert, contextUser, userCognitoNewPasswordRequired, formLoginWatchEmail],
    )*/

    React.useEffect(() => {
        if (userCognitoNewPasswordRequired) {
            if (formNewPasswordWatchPassword === '' && formNewPasswordWatchConfirmPassword === '') {
                formNewPasswordTrigger(['password', 'confirmPassword']).then(() => null)
            } else {
                formNewPasswordTrigger(['confirmPassword']).then(() => null)
            }
        }
    }, [userCognitoNewPasswordRequired, formNewPasswordWatchPassword, formNewPasswordWatchConfirmPassword, formNewPasswordTrigger])

    if (userPasswordResetRequiredException) {
        const toAppAccountForgot = app.setting.route.getNode(app.setting.route.app.account.forgot).getTo()
        return <app.component.navigate.To to={`${toAppAccountForgot}?email=${formLoginWatchEmail}&codeSent=${true}`} />
    }

    return !userCognitoNewPasswordRequired ? (
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
                        {/*<app.component.button.ButtonSubmit space={1} disabled={formLogin.formState.isSubmitting || formLogin.formState.isValidating || !formLogin.formState.isValid} onClick={formLogin.handleSubmit(handleFormLoginSubmit)}>*/}
                        <app.component.button.ButtonSubmit space={1} disabled={formLogin.formState.isSubmitting || formLogin.formState.isValidating || !formLogin.formState.isValid}>
                            {formLogin.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Login />}
                            {i18n.getText('login.action.submit')}
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
                            name={'password'}
                            control={formNewPassword.control}
                            rules={{
                                validate: {
                                    handleFormNewPasswordValidatePassword,
                                },
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
                                        left: 1,
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
                                    handleFormNewPasswordValidateConfirmPassword,
                                },
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
                                        left: 1,
                                    }}
                                    field={field}
                                />
                            )}
                        />
                    </app.layout.main.component.structure.box.content.Content>
                    {formNewPassword.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                    <app.layout.main.component.structure.box.action.Action>
                        {/*<app.component.button.ButtonSubmit space={1} disabled={formNewPassword.formState.isSubmitting || formNewPassword.formState.isValidating || !formNewPassword.formState.isValid} onClick={formNewPassword.handleSubmit(handleFormNewPasswordSubmit)}>*/}
                        <app.component.button.ButtonSubmit space={1} disabled={formNewPassword.formState.isSubmitting || formNewPassword.formState.isValidating || !formNewPassword.formState.isValid}>
                            {formNewPassword.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Save />}
                            {i18n.getText('new-password.action.submit')}
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
