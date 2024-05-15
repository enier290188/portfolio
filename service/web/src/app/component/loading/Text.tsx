import { app, appType } from '@./app'
import React from 'react'

export const Text = ({ space = 0 }: { space?: appType.ComponentSpace }) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.component.loading, contextI18nLanguage), [contextI18nLanguage])

    return (
        <app.component.typography.Typography variant={'body1'} noWrap={true} space={space}>
            <app.component.loading.ProgressCircular />
            {i18n.getText('text')}
        </app.component.typography.Typography>
    )
}
