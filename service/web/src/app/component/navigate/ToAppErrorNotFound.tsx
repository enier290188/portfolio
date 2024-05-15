import { app } from '@./app'

export const ToAppErrorNotFound = () => {
    return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.error.notFound).getTo()} />
}
