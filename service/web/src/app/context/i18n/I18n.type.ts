import { appType } from '@./app'

export type TypeWrapperLanguage = appType.ContextI18nLanguage

export type TypeContext = {
    getLanguage: () => TypeWrapperLanguage
    updateLanguage: (language: TypeWrapperLanguage) => void
}
