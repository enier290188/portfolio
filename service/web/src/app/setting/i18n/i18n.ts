import { appType } from '@./app'
import { app } from './app'

const _getNode = (node: object, language: appType.ContextI18nLanguage = 'en'): { getText: (textKey: string, args?: object) => string } => {
    for (const [key, value] of Object.entries(node)) {
        if (key === `_${language}_` && typeof value === 'object') {
            const getText = (textKey: string, args: object = {}): string => {
                if (Object.hasOwn(value, textKey)) {
                    let text: string = value[textKey]
                    for (const [k, v] of Object.entries(args)) {
                        text = text.replace(`{${k}}`, v)
                    }

                    return text
                }
                return ''
            }

            return { getText: getText }
        }
    }
    return { getText: () => '' }
}

export const i18n = {
    ...app,
    getNode: _getNode
}
