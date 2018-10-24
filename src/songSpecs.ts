import { BaseSongSpec } from '../../../src/songTypes'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_PITCH_SCALAR: Scalar = 220 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_CORE: Core = 5 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_DURATION_SCALAR: Scalar = 100 as any

interface BeatenPathSongSpec extends BaseSongSpec {
    core: Core,
}

const beatenPathSongSpec: BeatenPathSongSpec = {
    core: BEATEN_PATH_CORE,
    songDurationScalar: BEATEN_PATH_DURATION_SCALAR,
    songPitchScalar: BEATEN_PATH_PITCH_SCALAR,
}

export {
    beatenPathSongSpec,
    BeatenPathSongSpec,
}
