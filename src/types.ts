import { Notes } from '../../../src/types'
import { Time } from '../../../src/utilities/nominalTypes'

interface DurationsAndRatios {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratios,
}

interface Numerator extends Number {
    _NumeratorBrand: string,
}

interface Denominator extends Number {
    _DenominatorBrand: string,
}

interface Core extends Number {
    _CoreBrand: string,
}

type FractionalPart = Numerator | Denominator
type Ratio = [Numerator, Denominator]
type Ratios = Ratio[]
type Durations = Time[]
type Block = [Notes, Notes]
type Blocks = Block[]

export {
    Block,
    Blocks,
    Core,
    Numerator,
    Denominator,
    FractionalPart,
    Durations,
    Ratio,
    Ratios,
    DurationsAndRatios,
}
