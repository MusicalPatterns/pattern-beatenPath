import {
    InputType,
    RangedInputType,
    Spec,
    standardConfigurations,
    standardInitialSpecs,
    StandardSpec,
} from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { from } from '../nominal'
import {
    BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_INITIAL_REVERSE,
    BEATEN_PATH_INITIAL_STYLE,
} from './constants'
import { BeatenPathConfigurations, BeatenPathSpecs, BeatenPathStyle } from './types'

const initialSpecs: BeatenPathSpecs = {
    ...standardInitialSpecs,
    [ StandardSpec.BASE_FREQUENCY ]: BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    core: BEATEN_PATH_INITIAL_CORE,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
    reverse: BEATEN_PATH_INITIAL_REVERSE,
    style: BEATEN_PATH_INITIAL_STYLE,
}

const coreDescription: string = `
every bar will consist of a harmony and polyrhythm of this value against itself either plus or minus 1
`

const configurations: BeatenPathConfigurations = {
    ...standardConfigurations,
    core: {
        constraint: {
            integer: true,
            min: from.Core(MINIMUM_FUNCTIONAL_CORE),
        },
        description: coreDescription,
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

const spec: Spec<BeatenPathSpecs> = {
    configurations,
    initial: initialSpecs,
}

export {
    spec,
}
