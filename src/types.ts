import {
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
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
    reverse: boolean,
}

interface BeatenPathSpecAttributes extends SpecAttributes {
    core: RangedSpecPropertyAttributes,
    repetitions: RangedSpecPropertyAttributes,
    reverse: ToggledSpecPropertyAttributes,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathSpec,
    BeatenPathSpecAttributes,
}
