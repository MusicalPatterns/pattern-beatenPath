import {
    OptionedSpecPropertyAttributes,
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Cardinal } from '@musical-patterns/utilities'
import { Core } from '../nominal'

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
    BeatenPathStyle,
    BeatenPathSpec,
    BeatenPathSpecAttributes,
}
