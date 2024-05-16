import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const ProgressLinear = () => {
    const sxLinearProgress = React.useCallback(
        (theme: muiType.Theme) => ({
            height: '1px',
            margin: theme.spacing(0),
            padding: theme.spacing(0),
        }),
        [],
    )

    return <mui.component.LinearProgress variant={'indeterminate'} color={'primary'} sx={sxLinearProgress} />
}
