import { appType } from '@./app'
import { muiType } from '@./package/material-ui'

export type DialogProps = {
    children?: appType.TypeChildrenProps
    dialogProps?: muiType.DialogProps
}
