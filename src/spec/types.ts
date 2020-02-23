import { Entity } from '@musical-patterns/material'
import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/spec'
import { Cardinal } from '@musical-patterns/utilities'
import { Core, Repetition, Repetitions } from '../nominals'

enum BeatenPathStyle {
    POLYRHYTHMIC = 'POLYRHYTHMIC',
    SMOOTH = 'SMOOTH',
}

interface BeatenPathSpecs extends Specs {
    core: Core,
    entityCount: Cardinal<Entity[]>,
    repetitions: Repetitions,
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
