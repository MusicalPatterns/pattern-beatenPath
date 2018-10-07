import { Song, SongName } from '../../../src/songTypes'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { BEATEN_PATH_BASE_FREQUENCY } from './basePitch'
import { beatenPathCompile } from './compile'
import { beatenPathHandleCustomConfigChange } from './handleCustomConfigChange'
import { nonScale } from './pitches'
import { Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const DEFAULT_BEATEN_PATH_CORE: Core = 5 as any
// tslint:disable-next-line:no-any no-magic-numbers
const BEATEN_PATH_DURATION_SCALAR: Scalar = 100 as any

const beatenPath: Song = {
    compile: beatenPathCompile,
    customConfig: {
        core: DEFAULT_BEATEN_PATH_CORE,
    },
    // tslint:disable-next-line:max-line-length
    description: 'repeated metric modulation of polyrhythms by neighboring superparticulars, never deviating any further from original duration than necessary',
    entityConfigs: [],
    formattedName: 'Beaten Path',
    handleCustomConfigChange: beatenPathHandleCustomConfigChange,
    name: SongName.BEATEN_PATH,
    scales: [
        nonScale,
    ],
    standardConfig: {
        baseFrequency: BEATEN_PATH_BASE_FREQUENCY,
        durationScalar: BEATEN_PATH_DURATION_SCALAR,
    },
}

export {
    beatenPath,
}
