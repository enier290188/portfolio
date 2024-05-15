import { mui, muiType } from '@./package/material-ui'
import React from 'react'
import { DialogProps } from './Dialog.type.ts'

const DialogTransition = React.forwardRef(function Transition(props: muiType.TransitionProps & { children: React.ReactElement }, ref: React.Ref<unknown>) {
    return (
        <mui.component.Zoom ref={ref} mountOnEnter={true} unmountOnExit={true} in={true} {...props}>
            {props.children}
        </mui.component.Zoom>
    )
})

export const Dialog = ({ children, dialogProps }: DialogProps) => {
    const sxDialog = React.useCallback(
        (theme: muiType.Theme) => ({
            zIndex: theme.zIndex.drawer + 2,
            '& .MuiDialog-container': {
                margin: {
                    xs: theme.spacing(0, 0, 0, 0),
                    md: theme.spacing(4, 2, 2, 2)
                },
                padding: theme.spacing(0)
            },
            '& .MuiDialog-paper': {
                margin: theme.spacing(0),
                padding: theme.spacing(0),
                borderRadius: 0,
                boxShadow: 0,
                backgroundColor: 'transparent',
                '& > div > div': {
                    borderColor: theme.palette.common.white,
                    borderRadius: {
                        xs: 0,
                        md: 1
                    }
                }
            }
        }),
        []
    )

    const dialogPropsRest: muiType.DialogProps = dialogProps ? { ...dialogProps } : { open: true }

    return (
        <mui.component.Dialog TransitionComponent={DialogTransition} keepMounted={false} fullScreen={true} fullWidth={true} maxWidth={false} scroll={'paper'} disableEscapeKeyDown={true} sx={sxDialog} onClose={() => null} {...dialogPropsRest}>
            {children}
        </mui.component.Dialog>
    )
}
