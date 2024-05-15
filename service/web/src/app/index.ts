import './App.css'
import App from './App.tsx'
import { asset } from './asset'
import { setting } from './setting'
import * as appType from './type'

export const app = {
    asset,
    setting,
}

export type { appType }

export default App
