import {
    RangedInputType,
    SpecDataFor,
    SpecPropertyType,
    standardInitialSpec,
    standardSpecAttributes,
    StandardSpecProperties,
} from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import {
    BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_INITIAL_REVERSE,
    BEATEN_PATH_INITIAL_STYLE,
    MINIMUM_FUNCTIONAL_CORE,
} from './constants'
import { from } from './nominal'
import { BeatenPathSpec, BeatenPathSpecAttributes, BeatenPathStyle } from './types'

const initialSpec: BeatenPathSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.BASE_FREQUENCY ]: BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    core: BEATEN_PATH_INITIAL_CORE,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
    reverse: BEATEN_PATH_INITIAL_REVERSE,
    style: BEATEN_PATH_INITIAL_STYLE,
}

const coreDescription: string = `
every bar will consist of a harmony and polyrhythm of this value against itself either plus or minus 1
`

const attributes: BeatenPathSpecAttributes = {
    ...standardSpecAttributes,
    core: {
        constraint: {
            integer: true,
            min: from.Core(MINIMUM_FUNCTIONAL_CORE),
        },
        description: coreDescription,
        hideInput: RangedInputType.RANGE,
        order: 1,
        specPropertyType: SpecPropertyType.RANGED,
    },
    repetitions: {
        constraint: {
            integer: true,
            min: 1,
        },
        hideInput: RangedInputType.RANGE,
        order: 3,
        specPropertyType: SpecPropertyType.RANGED,
        units: Units.BARS,
    },
    reverse: {
        order: 4,
        specPropertyType: SpecPropertyType.TOGGLED,
    },
    style: {
        constraint: [
            {
                key: BeatenPathStyle.POLYRHYTHMIC,
                order: 1,
            },
            {
                key: BeatenPathStyle.SMOOTH,
                order: 2,
            },
        ],
        order: 2,
        specPropertyType: SpecPropertyType.OPTIONED,
    },
}

const specData: SpecDataFor<BeatenPathSpec> = {
    attributes,
    initial: initialSpec,
}

export {
    specData,
}
