import { PatternSpec } from '@musical-patterns/registry'
import { Count, Ratio, Scalar } from '@musical-patterns/utilities'
import { Core } from './nominal'

interface DurationsAndRatios {
    durations: Durations,
    ratios: Ratio[],
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
