import {
    Data,
    PropertyType,
    RangedInputType,
    standardAttributes,
    standardInitialSpec,
    StandardProperty,
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
import { BeatenPathAttributes, BeatenPathSpec, BeatenPathStyle } from './types'

const initialSpec: BeatenPathSpec = {
    ...standardInitialSpec,
    [ StandardProperty.BASE_FREQUENCY ]: BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    core: BEATEN_PATH_INITIAL_CORE,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
    reverse: BEATEN_PATH_INITIAL_REVERSE,
    style: BEATEN_PATH_INITIAL_STYLE,
}

const coreDescription: string = `
every bar will consist of a harmony and polyrhythm of this value against itself either plus or minus 1
`

const attributes: BeatenPathAttributes = {
    ...standardAttributes,
    core: {
        constraint: {
            integer: true,
            min: from.Core(MINIMUM_FUNCTIONAL_CORE),
        },
        description: coreDescription,
        hideInput: RangedInputType.RANGE,
        order: 1,
        propertyType: PropertyType.RANGED,
    },
    repetitions: {
        constraint: {
            integer: true,
            min: 1,
        },
        hideInput: RangedInputType.RANGE,
        order: 3,
        propertyType: PropertyType.RANGED,
        units: Units.BARS,
    },
    reverse: {
        order: 4,
        propertyType: PropertyType.TOGGLED,
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
        order: 2,
        propertyType: PropertyType.OPTIONED,
    },
}

const data: Data<BeatenPathSpec> = {
    attributes,
    initial: initialSpec,
}

export {
    data,
}
