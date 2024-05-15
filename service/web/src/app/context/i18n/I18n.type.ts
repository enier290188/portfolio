import { appType } from '@./app'

export type TypeWrapperLanguage = appType.TypeSettingI18n

export type TypeContext = {
    getLanguage: () => TypeWrapperLanguage
    updateLanguage: (language: TypeWrapperLanguage) => void
}
