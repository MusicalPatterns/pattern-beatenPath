// tslint:disable variable-name no-any

import { Core } from './types'

const Core: (core: number) => Core =
    (core: number): Core => core as any

export {
    Core,
}
