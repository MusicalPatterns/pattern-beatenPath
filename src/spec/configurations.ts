import { InputType, OptionedConstraint, RangedInputType, standardConfigurations } from '@musical-patterns/spec'
import { as } from '@musical-patterns/utilities'
import { BEATEN_PATH_MINIMUM_FUNCTIONAL_CORE } from './constants'
import { BeatenPathConfigurations, BeatenPathStyle } from './types'

const styleConstraint: OptionedConstraint = [
    {
        order: 1,
        value: BeatenPathStyle.POLYRHYTHMIC,
    },
    {
        order: 2,
        value: BeatenPathStyle.SMOOTH,
    },
]
styleConstraint.required = true

const configurations: BeatenPathConfigurations = {
    ...standardConfigurations,
    core: {
        constraint: {
            integer: true,
            min: as.number(BEATEN_PATH_MINIMUM_FUNCTIONAL_CORE),
            required: true,
        },
        description: `every bar will consist of a harmony and polyrhythm of this value against itself \
either plus or minus 1`,
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: 1,
    },
    entityCount: {
        constraint: {
            integer: true,
            min: 1,
            required: true,
        },
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: 2,
    },
    repetitions: {
        constraint: {
            integer: true,
            min: 1,
        },
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: 4,
    },
    reverse: {
        inputType: InputType.TOGGLED,
        order: 5,
    },
    style: {
        constraint: styleConstraint,
        inputType: InputType.OPTIONED,
        order: 3,
    },
}

export {
    configurations,
}
