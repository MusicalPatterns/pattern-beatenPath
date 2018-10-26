import { Scalar } from '../../../src'
import { Core } from './nominal'
import { BeatenPathSongSpec } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_PITCH_SCALAR: Scalar = 220 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_CORE: Core = 5 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_DURATION_SCALAR: Scalar = 100 as any

const beatenPathSongSpec: BeatenPathSongSpec = {
    core: BEATEN_PATH_CORE,
    songDurationScalar: BEATEN_PATH_DURATION_SCALAR,
    songPitchScalar: BEATEN_PATH_PITCH_SCALAR,
}

export {
    beatenPathSongSpec,
}
