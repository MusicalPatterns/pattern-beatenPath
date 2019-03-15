import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/pattern'
import { Cardinal, Ordinal } from '@musical-patterns/utilities'
import { Core } from '../nominals'

enum BeatenPathStyle {
    POLYRHYTHMIC = 'POLYRHYTHMIC',
    SMOOTH = 'SMOOTH',
}

interface BeatenPathSpecs extends Specs {
    core: Core,
    entityCount: Ordinal,
    repetitions: Cardinal,
    reverse: boolean,
    style: BeatenPathStyle,
}

interface BeatenPathConfigurations extends Configurations<BeatenPathSpecs> {
    core: RangedConfiguration,
    entityCount: RangedConfiguration,
    repetitions: RangedConfiguration,
    reverse: ToggledConfiguration,
    style: OptionedConfiguration,
}

export {
    BeatenPathStyle,
    BeatenPathSpecs,
    BeatenPathConfigurations,
}
