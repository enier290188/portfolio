import { appType } from '@./app'
import { muiType } from '@./package/material-ui'

export type AlertProps = {
    children: appType.ChildrenProps
    variant?: muiType.AlertProps['variant']
    severity?: muiType.AlertProps['severity']
    onClose?: muiType.AlertProps['onClose']
    alertProps?: muiType.AlertProps
    space?: appType.ComponentSpace
}
