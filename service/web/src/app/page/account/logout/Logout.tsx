import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { form } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import React from 'react'

type TypeForm = object

const DEFAULT_VALUES: TypeForm = {}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.logout, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const contextAccessToken = React.useContext(app.context.accessToken.Context)

    const contextUser = React.useContext(app.context.user.Context)

    const formLogout = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })

    const handleActionSubmit = React.useCallback(async () => {
        const user = contextUser.getUser()
        contextAlert.addAlert({ type: 'success', message: i18n.getText('action.submit.alert.success', { name: user ? (user.name ? user.name : user.email ? user.email : '') : '' }) })
        contextAccessToken.removeValue()
        contextUser.logout()
    }, [i18n, contextAlert, contextAccessToken, contextUser])

    return (
        <app.layout.main.component.structure.page.Page maxWidth={'375px'}>
            {formLogout.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.body.Body>
                <mui.component.Box component={'form'} width={'100%'} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                    <app.layout.main.component.structure.box.content.Content>
                        <app.component.alert.Alert space={1} variant={'standard'} severity={'warning'}>
                            {i18n.getText('question.alert')}
                        </app.component.alert.Alert>
                    </app.layout.main.component.structure.box.content.Content>
                    {formLogout.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                    <app.layout.main.component.structure.box.action.Action>
                        <app.component.button.ButtonSubmit space={1} disabled={formLogout.formState.isSubmitting} onClick={formLogout.handleSubmit(handleActionSubmit)}>
                            {formLogout.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Logout />}
                            {i18n.getText('action.submit')}
                        </app.component.button.ButtonSubmit>
                    </app.layout.main.component.structure.box.action.Action>
                </mui.component.Box>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    )
}

export const Logout = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
