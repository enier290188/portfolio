import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Backdrop = () => {
    const sxBackdrop = React.useCallback(
        (theme: muiType.Theme) => ({
            cursor: 'wait',
            zIndex: theme.zIndex.drawer + 5,
        }),
        [],
    )

    return <mui.component.Backdrop component={'div'} open={true} invisible={true} sx={sxBackdrop} />
}
