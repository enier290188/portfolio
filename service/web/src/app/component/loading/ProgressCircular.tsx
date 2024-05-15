import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const ProgressCircular = () => {
    const sxCircularProgress = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(0),
            padding: theme.spacing(0)
        }),
        []
    )

    return <mui.component.CircularProgress variant={'indeterminate'} color={'inherit'} sx={sxCircularProgress} />
}
