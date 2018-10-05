// tslint:disable:variable-name no-any

import { Core, FractionalPart } from '../types'

const Core: (core: Core) => number =
    (core: Core): number => core as any

const FractionalPart: (fractionalPart: FractionalPart) => number =
    (fractionalPart: FractionalPart): number => fractionalPart as any

export {
    Core,
    FractionalPart,
}
