import {
    PatternSpecPropertyType,
    standardInitialPatternSpec,
    standardPatternSpecAttributes,
    StandardPatternSpecProperties,
} from '@musical-patterns/pattern'
import {
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_PITCH_SCALAR,
    MINIMUM_FUNCTIONAL_CORE,
} from './constants'
import { from } from './nominal'
import { BeatenPathPatternSpec, BeatenPathPatternSpecAttributes } from './types'

const initialSpec: BeatenPathPatternSpec = {
    ...standardInitialPatternSpec,
    [ StandardPatternSpecProperties.PATTERN_PITCH_SCALAR ]: BEATEN_PATH_PITCH_SCALAR,
    core: BEATEN_PATH_INITIAL_CORE,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
}

const specAttributes: BeatenPathPatternSpecAttributes = {
    ...standardPatternSpecAttributes,
    core: {
        constraint: {
            integer: true,
            min: from.Core(MINIMUM_FUNCTIONAL_CORE),
        },
        patternSpecPropertyType: PatternSpecPropertyType.RANGED,
    },
    repetitions: {
        constraint: {
            integer: true,
            min: 1,
        },
        patternSpecPropertyType: PatternSpecPropertyType.RANGED,
    },
}

export {
    initialSpec,
    specAttributes,
}
