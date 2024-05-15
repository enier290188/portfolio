import { value } from './i18n.value.ts'

const I18N_LIST: readonly ['en', 'es'] = value.I18N_LIST
export type TypeI18n = (typeof I18N_LIST)[number]
