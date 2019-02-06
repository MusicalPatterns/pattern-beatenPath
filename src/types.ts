import {
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Cardinal, Ratio, Scalar } from '@musical-patterns/utilities'
import { Core } from './nominal'

interface DurationsAndRatios {
    durations: Durations,
    ratios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathSpec extends Spec {
    core: Core,
    repetitions: Cardinal,
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
