import { Song } from '../../../src/types'
import { BEATEN_PATH_BASE_PITCH } from './basePitch'
import { beatenEntityFour, beatenEntityOne, beatenEntityThree, beatenEntityTwo } from './entities'
import { nonScale } from './pitches'

const beatenPath: Song = {
    baseFrequency: BEATEN_PATH_BASE_PITCH,
    entityConfigs: [
        beatenEntityOne,
        beatenEntityTwo,
        beatenEntityThree,
        beatenEntityFour,
    ],
    scales: [
        nonScale,
    ],
}

export {
    beatenPath,
}
