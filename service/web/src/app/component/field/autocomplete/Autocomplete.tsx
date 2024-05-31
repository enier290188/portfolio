import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import React from 'react'

export const Autocomplete = () => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(0)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0),
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft],
    )

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            ...
        </mui.component.Box>
    )
}
