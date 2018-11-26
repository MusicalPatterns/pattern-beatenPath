import { Count, Scalar } from '@musical-patterns/shared'
import { PatternSpec } from '../../types'
import { Core, Ratio } from './nominal'

interface DurationsAndRatios {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathPatternSpec extends PatternSpec {
    core: Core,
    repetitions: Count,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathPatternSpec,
}
