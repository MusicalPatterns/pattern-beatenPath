import { PatternSpec, PatternSpecAttributes, RangedPatternSpecPropertyAttributes } from '@musical-patterns/pattern'
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

interface BeatenPathPatternSpecAttributes extends PatternSpecAttributes {
    core: RangedPatternSpecPropertyAttributes,
    repetitions: RangedPatternSpecPropertyAttributes,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathPatternSpec,
    BeatenPathPatternSpecAttributes,
}
