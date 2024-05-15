import { value } from './alert.value.ts'

const ALERT_TYPE_LIST: readonly ['success', 'info', 'warning', 'error'] = value.ALERT_TYPE_LIST
export type TypeAlert = {
    id: ReturnType<typeof Date.now>
    type: (typeof ALERT_TYPE_LIST)[number]
    message: string
    duration?: number
}
