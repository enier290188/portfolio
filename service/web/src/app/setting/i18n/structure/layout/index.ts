import _en_ from './_en_.json'
import _es_ from './_es_.json'
import { footer } from './footer'
import { header } from './header'
import { onlineStatus } from './online-status'

export const layout = {
    layout: {
        _en_: { ..._en_ },
        _es_: { ..._es_ },
        ...footer,
        ...header,
        ...onlineStatus,
    },
}
