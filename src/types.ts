import {
    RangedPatternSpecPropertyAttributes,
    StandardPatternSpec,
    StandardPatternSpecAttributes,
} from '@musical-patterns/pattern'
import { Count, Ratio, Scalar } from '@musical-patterns/utilities'
import { Core } from './nominal'

interface DurationsAndRatios {
    durations: Durations,
    ratios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathPatternSpec extends StandardPatternSpec {
    core: Core,
    repetitions: Count,
}

interface BeatenPathPatternSpecAttributes extends StandardPatternSpecAttributes {
    core: RangedPatternSpecPropertyAttributes,
    repetitions: RangedPatternSpecPropertyAttributes,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathPatternSpec,
    BeatenPathPatternSpecAttributes,
}
