import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import React from 'react'

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.project.dashboard, i18nLanguage), [i18nLanguage])

    return (
        <app.layout.main.component.structure.page.Page maxWidth={'lg'}>
            <app.layout.main.component.structure.head.Head>
                <app.layout.main.component.structure.box.title.Title level={1}>
                    <mui.icon.Dashboard />
                    {i18n.getText('title')}
                </app.layout.main.component.structure.box.title.Title>
            </app.layout.main.component.structure.head.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.Body>
                <app.layout.main.component.structure.box.content.Content>
                    <app.component.underConstruction.UnderConstruction />
                </app.layout.main.component.structure.box.content.Content>
            </app.layout.main.component.structure.body.Body>
        </app.layout.main.component.structure.page.Page>
    )
}

export const Dashboard = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
