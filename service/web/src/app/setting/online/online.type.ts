import { value } from './online.value.ts'

const ONLINE_STATUS_LIST: readonly [true, false] = value.ONLINE_STATUS_LIST
export type TypeOnlineStatus = (typeof ONLINE_STATUS_LIST)[number]
