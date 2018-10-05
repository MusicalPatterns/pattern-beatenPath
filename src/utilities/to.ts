// tslint:disable:variable-name no-any

import { Core, Denominator, Numerator } from '../types'

const Core: (core: number) => Core =
    (core: number): Core => core as any

const Numerator: (numerator: number) => Numerator =
    (numerator: number): Numerator => numerator as any

const Denominator: (denominator: number) => Denominator =
    (denominator: number): Denominator => denominator as any

export {
    Core,
    Numerator,
    Denominator,
}
