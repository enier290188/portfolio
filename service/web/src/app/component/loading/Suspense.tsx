import { app } from '@./app'
import { mui } from '@./package/material-ui'
import React from 'react'

export const Suspense = ({ justifyContent = 'center' }: { justifyContent?: 'flex-start' | 'center' }) => {
    const sxSuspense = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: justifyContent,
            alignItems: 'flex-start',
        }),
        [justifyContent],
    )

    return (
        <mui.component.Box component={'div'} sx={sxSuspense}>
            <app.component.loading.Text space={2} />
        </mui.component.Box>
    )
}
