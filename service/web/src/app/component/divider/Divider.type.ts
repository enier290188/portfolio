import { appType } from '@./app'
import { muiType } from '@./package/material-ui'
import { ElementType } from 'react'

export type DividerProps = {
    component?: ElementType
    orientation?: muiType.DividerProps['orientation']
    dividerProps?: muiType.DividerProps
    space?: appType.ComponentSpace
}
