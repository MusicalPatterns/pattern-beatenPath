import { InputType, RangedInputType, standardConfigurations } from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { from } from '../nominals'
import { BeatenPathConfigurations, BeatenPathStyle } from './types'

const configurations: BeatenPathConfigurations = {
    ...standardConfigurations,
    core: {
        constraint: {
            integer: true,
            min: from.Core(MINIMUM_FUNCTIONAL_CORE),
        },
        description: `every bar will consist of a harmony and polyrhythm of this value against itself \
either plus or minus 1`,
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: 1,
    },
    repetitions: {
        constraint: {
            integer: true,
            min: 1,
        },
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: 3,
        units: Units.BARS,
    },
    reverse: {
        inputType: InputType.TOGGLED,
        order: 4,
    },
    style: {
        constraint: [
            {
                order: 1,
                value: BeatenPathStyle.POLYRHYTHMIC,
            },
            {
                order: 2,
                value: BeatenPathStyle.SMOOTH,
            },
        ],
        inputType: InputType.OPTIONED,
        order: 2,
    },
}

export {
    configurations,
}
