import { DEFAULT_RAW_TIME_TYPE_DURATION_SCALAR } from '../../../src'
import { BEATEN_PATH_CORE, BEATEN_PATH_PITCH_SCALAR } from './constants'
import { BeatenPathSongSpec } from './types'

const beatenPathSongSpec: BeatenPathSongSpec = {
    core: BEATEN_PATH_CORE,
    songDurationScalar: DEFAULT_RAW_TIME_TYPE_DURATION_SCALAR,
    songPitchScalar: BEATEN_PATH_PITCH_SCALAR,
}

export {
    beatenPathSongSpec,
}
