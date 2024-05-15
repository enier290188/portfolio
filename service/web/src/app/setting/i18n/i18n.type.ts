import { value } from './i18n.value.ts'

const I18N_LANGUAGE_LIST: readonly ['en', 'es'] = value.I18N_LANGUAGE_LIST
export type TypeI18nLanguage = (typeof I18N_LANGUAGE_LIST)[number]
