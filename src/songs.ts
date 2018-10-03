import { Song } from '../../../src/types'
import { BEATEN_PATH_BASE_PITCH } from './basePitch'
import { beatenEntityArpeggios, beatenEntityOne, beatenEntityTwo } from './entities'
import { nonScale } from './pitches'

const beatenPath: Song = {
    baseFrequency: BEATEN_PATH_BASE_PITCH,
    entityConfigs: [
        beatenEntityOne,
        beatenEntityTwo,
        beatenEntityArpeggios,
    ],
    scales: [
        nonScale,
    ],
}

export {
    beatenPath,
}
