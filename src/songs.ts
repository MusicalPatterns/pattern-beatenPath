import { Song, SongName } from '../../../src/songTypes'
import { BEATEN_PATH_BASE_FREQUENCY } from './basePitch'
import { beatenPathCompile } from './compile'
import { nonScale } from './pitches'
import { Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const DEFAULT_BEATEN_PATH_CORE: Core = 5 as any

const beatenPath: Song = {
    baseFrequency: BEATEN_PATH_BASE_FREQUENCY,
    compile: beatenPathCompile,
    config: {
        core: DEFAULT_BEATEN_PATH_CORE,
    },
    entityConfigs: [],
    formattedName: 'Beaten Path',
    name: SongName.BEATEN_PATH,
    scales: [
        nonScale,
    ],
}

export {
    beatenPath,
}
