import {
    OptionedSpecPropertyAttributes,
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Cardinal, Ratio, Scalar } from '@musical-patterns/utilities'
import { Core } from './nominal'

interface DurationsAndRatios {
    durations: Scalar[],
    ratios: Ratio[],
}

enum BeatenPathStyle {
    POLYRHYTHMIC = 'POLYRHYTHMIC',
    SMOOTH = 'SMOOTH',
}

interface BeatenPathSpec extends Spec {
    core: Core,
    repetitions: Cardinal,
    reverse: boolean,
    style: BeatenPathStyle,
}

interface BeatenPathSpecAttributes extends SpecAttributes {
    core: RangedSpecPropertyAttributes,
    repetitions: RangedSpecPropertyAttributes,
    reverse: ToggledSpecPropertyAttributes,
    style: OptionedSpecPropertyAttributes,
}

export {
    DurationsAndRatios,
    BeatenPathSpec,
    BeatenPathSpecAttributes,
    BeatenPathStyle,
}
