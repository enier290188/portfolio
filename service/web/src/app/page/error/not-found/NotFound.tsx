import { app } from '@./app'
import { router } from '@./package/react-router'
import React from 'react'

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.error.notFound, contextI18nLanguage), [contextI18nLanguage])

    return (
        <>
            <app.component.typography.Typography space={{ top: 1, right: 1, bottom: 0, left: 1 }} variant={'h5'} noWrap={false} typographyProps={{ textAlign: 'center' }}>
                <i>{i18n.getText('title')}</i>
            </app.component.typography.Typography>
            <app.component.typography.Typography space={{ top: 0, right: 1, bottom: 2, left: 1 }} variant={'body1'} noWrap={false} typographyProps={{ textAlign: 'center' }}>
                {i18n.getText('message')}
            </app.component.typography.Typography>
        </>
    )
}

export const NotFound = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
