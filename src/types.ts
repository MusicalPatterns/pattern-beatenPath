import { RangedSpecPropertyAttributes, Spec, SpecAttributes } from '@musical-patterns/pattern'
import { Count, Ratio, Scalar } from '@musical-patterns/utilities'
import { Core } from './nominal'

interface DurationsAndRatios {
    durations: Durations,
    ratios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathSpec extends Spec {
    core: Core,
    repetitions: Count,
}

interface BeatenPathSpecAttributes extends SpecAttributes {
    core: RangedSpecPropertyAttributes,
    repetitions: RangedSpecPropertyAttributes,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathSpec,
    BeatenPathSpecAttributes,
}
