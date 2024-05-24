import { app } from '@./app'
import { router } from '@./package/react-router'

export const ToAppAccountLogin = () => {
    const location = router.hook.useLocation()
    const toAppAccountLogin = app.setting.route.getNode(app.setting.route.app.page.account.login).getTo()
    const toAppAccountLogout = app.setting.route.getNode(app.setting.route.app.page.account.logout).getTo()
    const toAppWorkspace = app.setting.route.getNode(app.setting.route.app.page.workspace).getTo()
    const toFrom = location?.pathname ?? toAppAccountLogin

    return <app.component.navigate.To to={toFrom !== toAppAccountLogin && toFrom !== toAppAccountLogout && toFrom !== toAppWorkspace ? `${toAppAccountLogin}?urlTo=${toFrom}` : toAppAccountLogin} />
}
