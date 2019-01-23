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
    BEATEN_PATH_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    MINIMUM_FUNCTIONAL_CORE,
} from './constants'
import { from } from './nominal'
import { BeatenPathSpec, BeatenPathSpecAttributes } from './types'

const initial: BeatenPathSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.BASE_FREQUENCY ]: BEATEN_PATH_BASE_FREQUENCY,
    core: BEATEN_PATH_INITIAL_CORE,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
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
        order: 2,
        specPropertyType: SpecPropertyType.RANGED,
        units: Units.BARS,
    },
}

const specData: SpecDataFor<BeatenPathSpec> = {
    attributes,
    initial,
}

export {
    specData,
}
