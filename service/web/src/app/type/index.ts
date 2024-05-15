import { app } from '@./app'

const I18N_LANGUAGE_LIST: readonly ['en', 'es'] = app.setting.value.I18N_LANGUAGE_LIST
export type ContextI18nLanguage = (typeof I18N_LANGUAGE_LIST)[number]
