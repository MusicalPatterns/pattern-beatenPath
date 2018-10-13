import { SongID, SongSpec } from '../../../src/songTypes'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { BEATEN_PATH_BASE_FREQUENCY } from './basePitch'
import { compileBeatenPathSong } from './compile'
import { nonScale } from './scales'
import { Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const DEFAULT_BEATEN_PATH_CORE: Core = 5 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_DURATION_SCALAR: Scalar = 100 as any

const beatenPathSongSpec: SongSpec = {
    compile: compileBeatenPathSong,
    config: {
        baseFrequency: BEATEN_PATH_BASE_FREQUENCY,
        core: DEFAULT_BEATEN_PATH_CORE,
        durationScalar: BEATEN_PATH_DURATION_SCALAR,
    },
    entitySpecs: [],
    scales: [
        nonScale,
    ],
    songId: SongID.BEATEN_PATH,
}

export {
    beatenPathSongSpec,
}
