import { app, appType } from '@./app'
import React from 'react'

export const Text = ({ space = 0 }: { space?: appType.TypeSettingThemeComponentSpace }) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.component.loading, i18nLanguage), [i18nLanguage])

    return (
        <app.component.typography.Typography variant={'body1'} noWrap={true} space={space}>
            <app.component.loading.ProgressCircular />
            {i18n.getText('text')}
        </app.component.typography.Typography>
    )
}
