import { TypeI18n } from './i18n.type.ts'
import { value } from './i18n.value.ts'
import { structure } from './structure'

const _getNode = (node: object, language: TypeI18n = 'en'): { getText: (textKey: string, args?: object) => string } => {
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
    ...structure,
    getNode: _getNode,
    value: value,
}
