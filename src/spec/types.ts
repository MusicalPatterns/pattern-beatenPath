import {
    Attributes,
    OptionedPropertyAttributes,
    RangedPropertyAttributes,
    Spec,
    ToggledPropertyAttributes,
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

interface BeatenPathAttributes extends Attributes<BeatenPathSpec> {
    core: RangedPropertyAttributes,
    repetitions: RangedPropertyAttributes,
    reverse: ToggledPropertyAttributes,
    style: OptionedPropertyAttributes,
}

export {
    BeatenPathStyle,
    BeatenPathSpec,
    BeatenPathAttributes,
}
