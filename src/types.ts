import { Count, PatternSpec, Scalar } from '@musical-patterns/shared'
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
