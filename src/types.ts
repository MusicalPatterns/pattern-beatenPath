import {
    RangedSpecPropertyAttributes,
    StandardSpec,
    StandardSpecAttributes,
} from '@musical-patterns/pattern'
import { Count, Ratio, Scalar } from '@musical-patterns/utilities'
import { Core } from './nominal'

interface DurationsAndRatios {
    durations: Durations,
    ratios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathSpec extends StandardSpec {
    core: Core,
    repetitions: Count,
}

interface BeatenPathSpecAttributes extends StandardSpecAttributes {
    core: RangedSpecPropertyAttributes,
    repetitions: RangedSpecPropertyAttributes,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathSpec,
    BeatenPathSpecAttributes,
}
