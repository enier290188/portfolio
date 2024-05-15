import { value } from './online.value.ts'

const ONLINE_LIST: readonly [true, false] = value.ONLINE_LIST
export type TypeOnline = (typeof ONLINE_LIST)[number]
