import { standardInitialSpecs, StandardSpec } from '@musical-patterns/spec'
import {
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_ENTITY_COUNT,
    BEATEN_PATH_INITIAL_HZ_PHYSICALIZATION,
    BEATEN_PATH_INITIAL_REVERSE,
    BEATEN_PATH_INITIAL_STYLE,
} from './constants'
import { BeatenPathSpecs } from './types'

const initialSpecs: BeatenPathSpecs = {
    ...standardInitialSpecs,
    [ StandardSpec.HZ_PHYSICALIZATION ]: BEATEN_PATH_INITIAL_HZ_PHYSICALIZATION,
    core: BEATEN_PATH_INITIAL_CORE,
    entityCount: BEATEN_PATH_INITIAL_ENTITY_COUNT,
    repetitions: undefined,
    reverse: BEATEN_PATH_INITIAL_REVERSE,
    style: BEATEN_PATH_INITIAL_STYLE,
}

export {
    initialSpecs,
}
