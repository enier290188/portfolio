import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Alert = () => {
    const contextAlert = React.useContext(app.context.alert.Context)
    const alertList = contextAlert.getAlertList()

    const sxAlert = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            zIndex: theme.zIndex.drawer + 4,
        }),
        [],
    )
    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            position: 'absolute',
            margin: {
                xs: theme.spacing(2, 2, 0, 2),
                md: theme.spacing(4, 0, 0, 0),
            },
            padding: theme.spacing(0),
        }),
        [],
    )

    return 0 < alertList.length ? (
        <mui.component.Box component={'section'} sx={sxAlert}>
            <mui.component.Box component={'div'} sx={sxContent}>
                {alertList.map((alert, index) => (
                    <app.component.alert.Alert key={alert.id} space={alertList.length === index + 1 ? 0 : { top: 0, right: 0, bottom: 2, left: 0 }} variant={'filled'} severity={alert.type} onClose={() => contextAlert.deleteAlert(alert.id)}>
                        {alert.message}
                    </app.component.alert.Alert>
                ))}
            </mui.component.Box>
        </mui.component.Box>
    ) : null
}
