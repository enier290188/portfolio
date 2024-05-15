import { app } from '@./app'

export const ToAppErrorBoundary = () => {
    return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.error.boundary).getTo()} />
}
