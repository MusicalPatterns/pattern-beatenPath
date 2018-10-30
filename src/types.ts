import { Scalar } from '../../../src'
import { SongSpec } from '../../types'
import { Core, Ratio } from './nominal'

interface DurationsAndRatios {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratio[],
}

type Durations = Scalar[]

interface BeatenPathSongSpec extends SongSpec {
    core: Core,
}

export {
    Durations,
    DurationsAndRatios,
    BeatenPathSongSpec,
}
