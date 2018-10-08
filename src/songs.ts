import { Song, SongName } from '../../../src/songTypes'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { BEATEN_PATH_BASE_FREQUENCY } from './basePitch'
import { beatenPathCompile } from './compile'
import { beatenPathHandleConfigChange } from './handleConfigChange'
import { nonScale } from './pitches'
import { Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const DEFAULT_BEATEN_PATH_CORE: Core = 5 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_DURATION_SCALAR: Scalar = 100 as any

const beatenPath: Song = {
    compile: beatenPathCompile,
    config: {
        baseFrequency: BEATEN_PATH_BASE_FREQUENCY,
        core: DEFAULT_BEATEN_PATH_CORE,
        durationScalar: BEATEN_PATH_DURATION_SCALAR,
    },
    // tslint:disable-next-line:max-line-length
    description: 'repeated metric modulation of polyrhythms by neighboring superparticulars, never deviating any further from original duration than necessary',
    entityConfigs: [],
    formattedName: 'Beaten Path',
    handleConfigChange: beatenPathHandleConfigChange,
    name: SongName.BEATEN_PATH,
    scales: [
        nonScale,
    ],
}

export {
    beatenPath,
}
