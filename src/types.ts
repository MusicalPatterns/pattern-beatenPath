import { Scalar } from '../../../src'
import { PatternSpec } from '../../types'
import { Core, Ratio } from './nominal'

interface DurationsAndRatios {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathPatternSpec extends PatternSpec {
    core: Core,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathPatternSpec,
}
