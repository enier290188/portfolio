import './App.css'
import App from './App.tsx'
import { asset } from './asset'
import { component } from './component'
import { context } from './context'
import { hook } from './hook'
import { layout } from './layout'
import { service } from './service'
import { setting } from './setting'
import * as appType from './type'

export const app = {
    asset,
    component,
    context,
    hook,
    layout,
    service,
    setting,
}

export type { appType }

export default App
