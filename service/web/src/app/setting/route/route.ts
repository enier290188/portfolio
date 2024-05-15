import { value as routeValue } from './route.value.ts'
import { structure } from './structure'

const _getNode = (node: object): { getPath: () => string; getTo(args?: object): string } => {
    const nodeResponse = { getPath: () => '', getTo: () => '' }
    let isGetPathDone = false
    let isGetToDone = false
    for (const [key, value] of Object.entries(node)) {
        if (key === routeValue.PATH && typeof value === 'string') {
            nodeResponse.getPath = (): string => `${value}/`
            isGetPathDone = true
            continue
        }
        if (key === routeValue.TO && typeof value === 'function') {
            nodeResponse.getTo = (args: object = {}): string => `/${value({ ...args }).join('/')}/`
            isGetToDone = true
            continue
        }
        if (isGetPathDone && isGetToDone) {
            break
        }
    }
    return nodeResponse
}

export const route = {
    ...structure,
    getNode: _getNode,
}
