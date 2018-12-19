import { PatternSpec } from '@musical-patterns/pattern'
import { Count, Scalar } from '@musical-patterns/utilities'
import { Core, Ratio } from './nominal'

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
