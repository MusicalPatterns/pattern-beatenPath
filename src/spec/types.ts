import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/pattern'
import { Cardinal } from '@musical-patterns/utilities'
import { Core } from '../nominal'

enum BeatenPathStyle {
    POLYRHYTHMIC = 'POLYRHYTHMIC',
    SMOOTH = 'SMOOTH',
}

interface BeatenPathSpecs extends Specs {
    core: Core,
    repetitions: Cardinal,
    reverse: boolean,
    style: BeatenPathStyle,
}

interface BeatenPathConfigurations extends Configurations<BeatenPathSpecs> {
    core: RangedConfiguration,
    repetitions: RangedConfiguration,
    reverse: ToggledConfiguration,
    style: OptionedConfiguration,
}

export {
    BeatenPathStyle,
    BeatenPathSpecs,
    BeatenPathConfigurations,
}
