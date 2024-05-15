import { appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'

export const MenuContent = ({ children, anchorEl, onClick }: { children: appType.TypeChildrenProps; anchorEl: null | HTMLElement; onClick?: muiType.MenuProps['onClick'] }) => {
    const sxMenuPaperProps = (theme: muiType.Theme) => ({
        m: theme.spacing(2, 0, 0, 0),
        p: theme.spacing(0),
        boxShadow: `0px 1px 4px 0px ${theme.palette.divider}, 0px -1px 4px 0px ${theme.palette.divider}, 1px 0px 4px 0px ${theme.palette.divider}, -1px 0px 4px 0px ${theme.palette.divider}`,
        overflow: 'visible',
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: theme.spacing(0),
            right: theme.spacing(4),
            width: theme.spacing(3),
            height: theme.spacing(3),
            backgroundColor: theme.palette.common.white,
            transform: 'translateY(-50%) rotate(45deg)',
            boxShadow: `-2px 0px 0px 0px ${theme.palette.divider}, 0px -2px 0px 0px ${theme.palette.divider}`,
            zIndex: 0,
        },
    })

    return (
        <mui.component.Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }}
            transformOrigin={{
                horizontal: 'right',
                vertical: 'top',
            }}
            PaperProps={{
                elevation: 0,
                sx: sxMenuPaperProps,
            }}
            disablePortal={true}
            onClick={onClick}
        >
            {children}
        </mui.component.Menu>
    )
}
