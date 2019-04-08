import { standardInitialSpecs, StandardSpec } from '@musical-patterns/spec'
import {
    BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_ENTITY_COUNT,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_INITIAL_REVERSE,
    BEATEN_PATH_INITIAL_STYLE,
} from './constants'
import { BeatenPathSpecs } from './types'

const initialSpecs: BeatenPathSpecs = {
    ...standardInitialSpecs,
    [ StandardSpec.BASE_FREQUENCY ]: BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    core: BEATEN_PATH_INITIAL_CORE,
    entityCount: BEATEN_PATH_INITIAL_ENTITY_COUNT,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
    reverse: BEATEN_PATH_INITIAL_REVERSE,
    style: BEATEN_PATH_INITIAL_STYLE,
}

export {
    initialSpecs,
}
